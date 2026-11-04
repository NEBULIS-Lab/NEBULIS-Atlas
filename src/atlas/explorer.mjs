// A composed scene: terrain cells, independent sprite objects, camera and data nodes.
const escapeHTML = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export async function createExplorer(host,options){
 const {base,islands,catalog,media,isRead,onRead,onTerm,onSearch}=options;
 const byId=Object.fromEntries(catalog.resources.map(r=>[r.id,r]));
 const islandById=Object.fromEntries(islands.map(i=>[i.id,i]));
 const url=p=>base+(p.startsWith('/')?p:'/'+p);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const [world,atlas]=await Promise.all([fetch(url('/content/world.json')).then(r=>r.json()),fetch(url('/scene-assets/atlas.json')).then(r=>r.json())]);
 if(!host.isConnected)return null;
 const desktopLayout={width:world.width,height:world.height,positions:world.regions.map(r=>[r.x,r.y])};let narrowLayout;
 function layoutWorld(){narrowLayout=innerWidth<760;world.width=narrowLayout?1540:desktopLayout.width;world.height=narrowLayout?2880:desktopLayout.height;const positions={starting:[20,130],robot:[780,130],embodied:[20,810],world:[780,810],harbor:[20,1490],multi:[780,1490],distributed:[400,2170]};world.regions.forEach((r,n)=>{[r.x,r.y]=narrowLayout?positions[r.id]:desktopLayout.positions[n];});}
 layoutWorld();
 const controller=new AbortController(),signal=controller.signal;
 const listen=(el,event,fn,opts={})=>el.addEventListener(event,fn,{...opts,signal});
 let disposed=false,selected=null,selectedNode=null,animation=null;
 let camera={x:0,y:0,z:.4},target={...camera},minZoom=.2,frameTime=0,lastSprite=-1;
 const pointers=new Map();let drag=null,pinch=null,moved=false;
 const animated=[],images=new Map(),regionElements=new Map();
 const coin=url('/scene-assets/codedex/coin-cropped.png');
 host.innerHTML=`<div class="sea-viewport" tabindex="0" aria-label="研究群岛地图，可拖动或用方向键平移，使用加减键缩放"><div class="sea-world" style="width:${world.width}px;height:${world.height}px"><svg class="sea-routes" width="${world.width}" height="${world.height}" aria-hidden="true"></svg></div></div><header class="explorer-header"><a class="world-brand" href="#/" aria-label="返回首页"><img src="${coin}" alt=""><span>NEBULIS<small>RESEARCH ADVENTURE</small></span></a><span class="world-title">The Research Archipelago</span><div class="world-nav"><button data-world="search" aria-label="搜索资料">⌕ <span>Search</span></button><a href="#/library">Resources ↗</a><a href="#/" class="world-home">Home</a></div></header><div class="world-intro"><span>Choose your next adventure</span><p>拖动海图，点击岛屿开始探索。</p></div><aside class="island-panel" aria-label="岛屿资料" hidden></aside><div class="world-controls" aria-label="地图操作"><button data-world="zoom-in" aria-label="放大地图">+</button><output class="zoom-level">100%</output><button data-world="zoom-out" aria-label="缩小地图">−</button><span></span><button data-world="overview" aria-label="查看全部岛屿" class="overview-button">⌖</button><button data-world="motion" aria-label="暂停环境动画" aria-pressed="${reduced}" class="motion-button">${reduced?'▶':'Ⅱ'}</button></div><nav class="world-destinations" aria-label="选择研究岛屿">${world.regions.map(r=>`<a href="#/island/${r.id}" style="--island-color:${islandById[r.id].color}"><span>${islandById[r.id].number}</span>${escapeHTML(islandById[r.id].short)}</a>`).join('')}</nav><div class="world-help"><span>DRAG TO EXPLORE</span><span>SCROLL TO ZOOM</span><span>CLICK AN ISLAND</span></div><div class="world-loading"><img src="${coin}" alt=""><span>Preparing your adventure…</span></div>`;
 const viewport=host.querySelector('.sea-viewport'),stage=host.querySelector('.sea-world'),panel=host.querySelector('.island-panel');
 let motionPaused=reduced;
 function loadImage(path){if(images.has(path))return images.get(path);const image=new Image();const p=new Promise((resolve,reject)=>{image.onload=()=>resolve(image);image.onerror=()=>reject(new Error(`Scene asset missing: ${path}`));});image.src=url(path);images.set(path,p);return p;}
 await Promise.all(Object.values(atlas.assets).map(a=>loadImage(a.file)));
 if(!host.isConnected||disposed)return null;
 const resolved=new Map();for(const [path,p]of images)resolved.set(path,await p);
 function draw(ctx,file,rect,x,y,w,h){ctx.drawImage(resolved.get(file),...rect,x,y,w,h);}
 function sprite(parent,name,x,y,scale=1,phase=0){
  const a=atlas.assets[name];if(!a)return;
  const f=a.frames?.[0]||a.sourceRect,anchor=a.frameAnchor||a.anchor;
  const node=document.createElement('div');node.className='world-sprite';node.dataset.asset=name;
  node.style.cssText=`left:${x}px;top:${y}px;width:${f[2]}px;height:${f[3]}px;background-image:url('${url(a.file)}');background-position:-${f[0]}px -${f[1]}px;transform:translate(${-anchor[0]*scale}px,${-anchor[1]*scale}px) scale(${scale});z-index:${Math.round(y)+100};`;
  parent.append(node);if(a.frames)animated.push({node,frames:a.frames,phase});return node;
 }
 function terrainPatch(ctx,shape,ox,oy,type='grass',cliffs=true){
  const C=world.cellSize,patch=type==='cliffTop'?atlas.terrain.cliffTop:atlas.terrain[type],file=patch.file||atlas.terrain.file;
  const inside=(x,y)=>y>=0&&y<shape.length&&x>=shape[y][0]&&x<=shape[y][1];
  for(let y=0;y<shape.length;y++)for(let x=shape[y][0];x<=shape[y][1];x++){
   const left=!inside(x-1,y),right=!inside(x+1,y),top=!inside(x,y-1),bottom=!inside(x,y+1);
   const key=top?(left?'topLeft':right?'topRight':'top'):bottom?(left?'bottomLeft':right?'bottomRight':'bottom'):left?'left':right?'right':'center';
   if(bottom&&cliffs)draw(ctx,atlas.terrain.cliffFace.file,atlas.terrain.cliffFace[left?'left':right?'right':'center'],ox+x*C,oy+(y+1)*C-8,C,C);
   draw(ctx,file,patch[key],ox+x*C,oy+y*C,C,C);
  }
 }
 function seeded(seed){return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
 function addRegion(r){
  const i=islandById[r.id],g=document.createElement('section');g.className='world-region';g.dataset.island=r.id;g.style.cssText=`left:${r.x}px;top:${r.y}px;--island-color:${i.color}`;
  const land=document.createElement('canvas');land.width=760;land.height=650;land.className='island-terrain';land.setAttribute('aria-hidden','true');const ctx=land.getContext('2d');ctx.imageSmoothingEnabled=false;
  // Shore foam lives below the independently built terrain grid.
  const shore=(shape,ox=0,oy=0)=>{const C=world.cellSize,inside=(x,y)=>y>=0&&y<shape.length&&x>=shape[y][0]&&x<=shape[y][1];for(let y=0;y<shape.length;y++)for(let x=shape[y][0];x<=shape[y][1];x++){if(!inside(x-1,y)||!inside(x+1,y)||!inside(x,y-1)||!inside(x,y+1))sprite(g,'water-foam',ox+x*C+C/2,oy+y*C+C/2+28+(inside(x,y+1)?0:20),.65,x+y);}};shore(r.shape);for(const s of r.satellites||[])shore(Array.from({length:s.h},(_,n)=>[n===0||n===s.h-1?1:0,s.w-(n===0||n===s.h-1?2:1)]),s.x,s.y+65);
  g.querySelectorAll('[data-asset="water-foam"]').forEach(el=>el.classList.add('shore-foam'));
  terrainPatch(ctx,r.shape,0,0,r.terrain);
  for(const s of r.satellites||[]){const shape=Array.from({length:s.h},(_,n)=>[n===0||n===s.h-1?1:0,s.w-(n===0||n===s.h-1?2:1)]);terrainPatch(ctx,shape,s.x,s.y+65,r.terrain);for(let x=330;x<480;x+=40)draw(ctx,atlas.terrain.bridge.file,atlas.terrain.bridge.horizontalMiddle,x,180,40,40);}
  // A dock is made of individual bridge tiles, not baked into an island bitmap.
  const dockX=r.id==='harbor'?320:280,dockY=r.shape.length*40-25;
  for(let n=0;n<3;n++)draw(ctx,atlas.terrain.bridge.file,atlas.terrain.bridge[n===0?'verticalStart':n===2?'verticalEnd':'verticalMiddle'],dockX,dockY+n*40,40,40);
  g.append(land);
  const hit=document.createElement('button');hit.className='island-hit';hit.setAttribute('aria-label',`探索 ${i.zh}`);hit.style.cssText=`width:${Math.max(...r.shape.map(s=>s[1])+1)*40}px;height:${r.shape.length*40}px`;hit.dataset.selectIsland=r.id;hit.tabIndex=-1;g.append(hit);
  r.buildings.forEach(([name,x,y,scale])=>sprite(g,name,x,y,scale,r.seed));
  r.trees.forEach(([x,y],n)=>sprite(g,'pine-tree-animation',x,y,.68+(n%3)*.09,n+r.seed));
  const random=seeded(r.seed),props=['bush-small','bush-medium','mushroom-small','rock-small','sprout-small','pumpkin-small'];
  for(let n=0;n<19;n++){const row=2+Math.floor(random()*(r.shape.length-4)),range=r.shape[row],x=(range[0]+1+random()*Math.max(1,range[1]-range[0]-2))*40;sprite(g,props[n%props.length],x,row*40+15,.65,n);}
  sprite(g,'direction-sign',dockX-50,dockY,0.7);
  const avatar=document.createElement('img');avatar.className='world-character';avatar.src=url('/scene-assets/codedex/'+r.character);avatar.alt='';avatar.style.cssText='left:300px;top:265px;';g.append(avatar);
  const nodes=r.id==='harbor'?['DS05','SIM03','B06','B03','DS09','B08']:i.nodes.filter(id=>byId[id]);
  const positions=nodes.map((id,n)=>({id,x:125+(n%4)*112,y:315+Math.floor(n/4)*80+(n%2?18:0)}));
  const path=document.createElementNS('http://www.w3.org/2000/svg','svg');path.setAttribute('class','island-learning-path');path.setAttribute('viewBox','0 0 760 650');path.innerHTML=`<polyline points="${positions.map(n=>`${n.x},${n.y}`).join(' ')}"/>`;g.append(path);
  positions.forEach((n,index)=>{const resource=byId[n.id],a=document.createElement('a');a.className='island-learning-node'+(isRead(resource)?' visited':'');a.href=`#/explore/${r.id}/${n.id}`;a.tabIndex=-1;a.style.cssText=`left:${n.x}px;top:${n.y}px`;a.setAttribute('aria-label',`${n.id} ${resource.title}`);a.innerHTML=`<img src="${coin}" alt=""><span>${isRead(resource)?'✓':index+1}</span><small>${escapeHTML(resource.title.split(' · ')[0].split(':')[0])}</small>`;g.append(a);});
  const label=document.createElement('a');label.href=`#/island/${r.id}`;label.className='island-name';label.style.cssText=`left:320px;top:${r.shape.length*40+95}px`;label.innerHTML=`<span class="island-name-index">${i.number}</span><strong>${escapeHTML(i.short)}</strong><small>${escapeHTML(i.zh)}</small>`;g.append(label);
  stage.append(g);regionElements.set(r.id,{g,r,i,avatar,positions});
 }
 world.regions.forEach(addRegion);
 const routeSVG=stage.querySelector('.sea-routes');
 function drawRoutes(){routeSVG.setAttribute('width',world.width);routeSVG.setAttribute('height',world.height);routeSVG.innerHTML=world.connections.map(([a,b])=>{const A=regionElements.get(a).r,B=regionElements.get(b).r;return `<path d="M ${A.x+320} ${A.y+430} Q ${(A.x+B.x)/2+500} ${(A.y+B.y)/2+550} ${B.x+320} ${B.y+430}"/>`;}).join('');}drawRoutes();
 // Scattered water rocks and foam are animated sprites on their own depth plane.
 const seaRandom=seeded(89);
 for(let n=0;n<70;n++){const x=seaRandom()*world.width,y=seaRandom()*world.height;if(world.regions.some(r=>x>r.x-40&&x<r.x+720&&y>r.y-60&&y<r.y+620))continue;const el=sprite(stage,n%8===0?'small-water-rock':'water-foam',x,y,n%8===0?.9:1.15,n);el.classList.add('sea-wave');if(n%8!==0)el.classList.add('sea-ripple');}
 host.querySelector('.world-loading').remove();
 function available(){const mobile=innerWidth<760;return {w:viewport.clientWidth-(selected&&!mobile?390:0),h:viewport.clientHeight-(selected&&mobile?viewport.clientHeight*.43:0)};}
 function fit(){const w=viewport.clientWidth,h=viewport.clientHeight,pad=w<760?24:50,top=w<760?130:100,vertical=w<760?220:175;minZoom=Math.min((w-pad)/(world.width+30),(h-vertical)/(world.height+30));return {z:minZoom,x:(w-world.width*minZoom)/2,y:top+(h-vertical-world.height*minZoom)/2};}
 function constrain(){target.z=clamp(target.z,minZoom,1.55);const w=viewport.clientWidth,h=viewport.clientHeight,slack=160;target.x=clamp(target.x,-world.width*target.z+w*.15,w*.85);target.y=clamp(target.y,-world.height*target.z+h*.15,h*.85);}
 function focusRegion(id){const r=regionElements.get(id).r,{w,h}=available(),z=Math.min(w/860,(h-100)/710,1.08);target={z:Math.max(minZoom,z),x:w/2-(r.x+320)*z,y:65+(h-65)/2-(r.y+280)*z};constrain();}
 function tick(time){if(disposed)return;const dt=Math.min(64,time-frameTime||16);frameTime=time;const k=reduced?1:1-Math.exp(-dt/85);for(const key of ['x','y','z'])camera[key]+=(target[key]-camera[key])*k;stage.style.transform=`translate3d(${camera.x}px,${camera.y}px,0) scale(${camera.z})`;host.style.setProperty('--camera-inverse',1/camera.z);host.querySelector('.zoom-level').value=Math.round(camera.z/minZoom*100)+'%';const step=Math.floor(time/150);if(!motionPaused&&step!==lastSprite){lastSprite=step;for(const a of animated){const f=a.frames[(step+a.phase)%a.frames.length];a.node.style.backgroundPosition=`-${f[0]}px -${f[1]}px`;}}animation=requestAnimationFrame(tick);}
 function showOverview(){selected=null;selectedNode=null;panel.hidden=true;host.classList.remove('island-selected');regionElements.forEach(({g})=>{g.classList.remove('selected');g.querySelector('.island-name').tabIndex=0;g.querySelectorAll('.island-learning-node').forEach(a=>a.tabIndex=-1);});host.querySelectorAll('.world-destinations a').forEach(a=>a.removeAttribute('aria-current'));target=fit();}
 function select(id,nodeId){if(!regionElements.has(id)){showOverview();return;}const changed=selected!==id;selected=id;selectedNode=nodeId&&byId[nodeId]?nodeId:null;regionElements.forEach(({g},key)=>{g.classList.toggle('selected',key===id);g.querySelector('.island-name').tabIndex=key===id?-1:0;g.querySelectorAll('.island-learning-node').forEach(a=>a.tabIndex=key===id?0:-1);});host.classList.add('island-selected');panel.hidden=false;host.querySelectorAll('.world-destinations a').forEach(a=>{if(a.hash===`#/island/${id}`)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});renderPanel();if(changed)focusRegion(id);if(selectedNode){const {avatar,positions}=regionElements.get(id),p=positions.find(n=>n.id===selectedNode);if(p){avatar.style.left=p.x+'px';avatar.style.top=(p.y-55)+'px';}}}
 function renderPanel(){const {i,r}=regionElements.get(selected),resource=selectedNode?byId[selectedNode]:null;
  const head=`<div class="island-panel-top"><a href="${resource?`#/island/${i.id}`:'#/explore'}">${resource?'← '+escapeHTML(i.short):'← World map'}</a><a href="#/explore" aria-label="关闭岛屿内容" class="panel-close">×</a></div>`;
  if(resource){const m=media[resource.id]||(resource.aliasOf?media[resource.aliasOf]:null);panel.innerHTML=head+`<div class="island-panel-body"><span class="panel-kicker">${resource.id} · ${resource.year||'LAB FRONTIER'}</span><h2>${escapeHTML(resource.title)}</h2><p class="panel-description">${escapeHTML(resource.summary)}</p>${m?`<figure class="panel-media">${m.video?`<video controls playsinline preload="none" aria-label="${escapeHTML(m.alt)}" poster="${url(m.image)}"><source src="${url(m.video)}" type="video/mp4"></video>`:`<img src="${url(m.image)}" alt="${escapeHTML(m.alt)}">`}<figcaption><a href="${escapeHTML(m.source)}" target="_blank" rel="noopener">${escapeHTML(m.credit)} ↗</a></figcaption></figure>`:''}<h3>这一站，重点看什么？</h3><ol class="panel-learn">${resource.learn.map(t=>`<li>${escapeHTML(t)}</li>`).join('')}</ol><div class="panel-source-links">${resource.links.map(l=>`<a href="${escapeHTML(l.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(l.label)} ↗</a>`).join('')}</div>${resource.note||resource.notes?`<p class="panel-note">${escapeHTML([resource.note||resource.notes].flat().join(' '))}</p>`:''}<div class="panel-terms">${(resource.terms||[]).map(id=>{const t=catalog.glossary.find(t=>t.id===id);return t?`<button data-world-term="${id}">${escapeHTML(t.term)} ?</button>`:'';}).join('')}</div><button class="template-button panel-read ${isRead(resource)?'is-read':''}" data-world-read="${resource.id}">${isRead(resource)?'✓ 已读 · 点击撤销':'标记为已读'}</button><a class="panel-full-link" href="#/resource/${resource.id}">打开完整资料页 →</a></div>`;
  }else{const nodes=i.id==='harbor'?catalog.resources.filter(n=>['dataset','simulator','benchmark'].includes(n.type)&&n.island==='harbor'):i.nodes.map(id=>byId[id]).filter(Boolean);panel.innerHTML=head+`<div class="island-panel-body"><span class="panel-kicker">ISLAND ${i.number} · ${escapeHTML(r.caption)}</span><h2>${escapeHTML(i.name)}</h2><p class="panel-chinese-title">${escapeHTML(i.zh)}</p><p class="panel-description">${escapeHTML(i.question)}</p><div class="panel-route-heading"><h3>${i.id==='harbor'?'港口资料':'探索节点'}</h3><span>${nodes.filter(isRead).length} / ${nodes.length} 已读</span></div><ol class="panel-node-list">${nodes.map((n,k)=>`<li><a href="#/explore/${i.id}/${n.id}"><img src="${coin}" alt=""><span class="panel-node-number">${isRead(n)?'✓':String(k+1).padStart(2,'0')}</span><span><strong>${escapeHTML(n.title)}</strong><small>${escapeHTML(n.summary)}</small></span><b>›</b></a></li>`).join('')}</ol><a class="panel-full-link" href="#/library?${i.id==='harbor'?'scope=harbor':'island='+i.id}">在资源目录中查看 →</a><div class="panel-guide"><img src="${url('/scene-assets/codedex/6wYeoCS.gif')}" alt=""><p>所有路线都已开放。<br>带着好奇心，选择你的下一站。</p></div></div>`;}
  panel.scrollTop=0;
 }
 function zoom(factor,cx=viewport.clientWidth/2,cy=viewport.clientHeight/2){const old=target.z,z=clamp(old*factor,minZoom,1.55);target.x=cx-(cx-target.x)*z/old;target.y=cy-(cy-target.y)*z/old;target.z=z;constrain();}
 listen(host,'click',e=>{const button=e.target.closest('[data-world]'),island=e.target.closest('[data-select-island]'),term=e.target.closest('[data-world-term]'),read=e.target.closest('[data-world-read]');if(island&&!moved)location.hash=`/island/${island.dataset.selectIsland}`;if(term)onTerm(term.dataset.worldTerm);if(read){onRead(read.dataset.worldRead);renderPanel();for(const {g}of regionElements.values())g.querySelectorAll('.island-learning-node').forEach(a=>{const id=a.hash.split('/').at(-1);a.classList.toggle('visited',isRead(byId[id]));a.querySelector('span').textContent=isRead(byId[id])?'✓':g.querySelectorAll('.island-learning-node').length&&Array.from(g.querySelectorAll('.island-learning-node')).indexOf(a)+1;});}if(!button)return;switch(button.dataset.world){case'zoom-in':zoom(1.3);break;case'zoom-out':zoom(1/1.3);break;case'overview':if(location.hash==='#/explore')showOverview();else location.hash='/explore';break;case'search':onSearch();break;case'motion':motionPaused=!motionPaused;button.setAttribute('aria-pressed',String(motionPaused));button.setAttribute('aria-label',motionPaused?'恢复环境动画':'暂停环境动画');button.textContent=motionPaused?'▶':'Ⅱ';host.classList.toggle('motion-paused',motionPaused);break;}});
 listen(viewport,'wheel',e=>{e.preventDefault();zoom(Math.exp(-e.deltaY*.0015),e.clientX,e.clientY);},{passive:false});
 listen(viewport,'pointerdown',e=>{if(e.button&&e.button!==0)return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});moved=false;if(pointers.size===2){const [a,b]=[...pointers.values()];pinch={distance:Math.hypot(a.x-b.x,a.y-b.y),z:target.z};drag=null;}else drag={id:e.pointerId,x:e.clientX,y:e.clientY,tx:target.x,ty:target.y};});
 listen(window,'pointermove',e=>{if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2&&pinch){e.preventDefault();const[a,b]=[...pointers.values()],distance=Math.hypot(a.x-b.x,a.y-b.y);zoom(pinch.z*distance/pinch.distance/target.z,(a.x+b.x)/2,(a.y+b.y)/2);moved=true;}else if(drag&&drag.id===e.pointerId){const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>6){moved=true;viewport.classList.add('dragging');target.x=drag.tx+dx;target.y=drag.ty+dy;constrain();}}},{passive:false});
 const release=e=>{pointers.delete(e.pointerId);if(pointers.size<2)pinch=null;if(!pointers.size){drag=null;viewport.classList.remove('dragging');setTimeout(()=>{moved=false;},0);}};
 listen(window,'pointerup',release);listen(window,'pointercancel',release);
 listen(viewport,'click',e=>{if(moved){e.preventDefault();e.stopImmediatePropagation();}}, {capture:true});
 listen(viewport,'keydown',e=>{if(e.target!==viewport)return;const actions={ArrowLeft:()=>target.x+=85,ArrowRight:()=>target.x-=85,ArrowUp:()=>target.y+=85,ArrowDown:()=>target.y-=85,'+':()=>zoom(1.2),'=':()=>zoom(1.2),'-':()=>zoom(1/1.2),'0':()=>{location.hash='/explore';showOverview();}};if(actions[e.key]){e.preventDefault();actions[e.key]();constrain();}});
 listen(window,'keydown',e=>{if(e.key==='Escape'&&!document.querySelector('dialog[open]')&&selected)location.hash=selectedNode?`/island/${selected}`:'/explore';});
 listen(window,'resize',()=>{if(narrowLayout!==(innerWidth<760)){layoutWorld();stage.style.width=world.width+'px';stage.style.height=world.height+'px';regionElements.forEach(({g,r})=>{g.style.left=r.x+'px';g.style.top=r.y+'px';});drawRoutes();}minZoom=fit().z;if(selected)focusRegion(selected);else target=fit();});
 target=fit();camera={...target};animation=requestAnimationFrame(tick);
 host.dataset.sceneReady='true';viewport.focus({preventScroll:true});host.classList.toggle('motion-paused',motionPaused);
 return {select,overview:showOverview,destroy(){disposed=true;controller.abort();cancelAnimationFrame(animation);host.querySelectorAll('video').forEach(v=>v.pause());host.replaceChildren();},get state(){return{selected,node:selectedNode,camera:{...camera},target:{...target},objects:host.querySelectorAll('.world-sprite').length,regions:regionElements.size};}};
}
