// Connections are assembled from the same source terrain/bridge tiles as the islands.
export function paintBridges(canvas, world, atlas, images) {
 canvas.width=world.width;canvas.height=world.height;
 const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;
 const regions=Object.fromEntries(world.regions.map(r=>[r.id,r]));
 const tile=(file,rect,x,y,w,h)=>ctx.drawImage(images.get(file),...rect,x,y,w,h);
 for(const bridge of world.bridges){
  const a=regions[bridge.from],b=regions[bridge.to];
  const ax=a.x+320,ay=a.y+240,bx=b.x+320,by=b.y+240;
  const angle=Math.atan2(by-ay,bx-ax),length=Math.hypot(bx-ax,by-ay),wood=bridge.material==='wood',width=wood?58:68;
  ctx.save();ctx.translate(ax,ay);ctx.rotate(angle);
  ctx.fillStyle='#123e6255';ctx.fillRect(0,-width/2+18,length,width+12);
  if(wood){
   const rect=atlas.terrain.bridge.horizontalMiddle;
   for(let x=0;x<length;x+=54)tile(atlas.terrain.bridge.file,rect,x,-width/2,56,width);
  }else{
   // Repeating stone deck, edge courses, and regularly spaced masonry piers.
   ctx.fillStyle='#405c70';ctx.fillRect(0,-width/2-6,length,width+17);
   const stone=atlas.terrain.cliffTop;
   for(let x=0;x<length;x+=52){tile(stone.file,stone.center,x,-width/2,54,width);}
   for(const y of [-width/2-5,width/2-5]){
    ctx.fillStyle='#adc9cb';ctx.fillRect(0,y,length,7);
    ctx.fillStyle='#577b8d';ctx.fillRect(0,y+7,length,5);
    for(let x=0;x<length;x+=32){ctx.fillStyle='#45667a';ctx.fillRect(x,y,3,8);}
   }
   for(let x=115;x<length-90;x+=165){
    tile(atlas.terrain.cliffFace.file,atlas.terrain.cliffFace.center,x,width/2+4,32,24);
    ctx.fillStyle='#c6dad3';ctx.fillRect(x-2,-width/2-8,20,12);ctx.fillRect(x-2,width/2-7,20,12);
   }
  }
  ctx.restore();
 }
 canvas.dataset.bridges=String(world.bridges.length);
}

export function decorateSea(stage, world, sprite, animated, url){
 stage.querySelectorAll('.sea-wave,.sea-boat').forEach(n=>n.remove());
 for(let n=animated.length-1;n>=0;n--)if(!animated[n].node.isConnected)animated.splice(n,1);
 let seed=179;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 const occupied=(x,y)=>world.regions.some(r=>x>r.x-90&&x<r.x+740&&y>r.y-80&&y<r.y+640);
 let placed=0;for(let attempt=0;attempt<500&&placed<57;attempt++){
  const x=100+random()*(world.width-200),y=120+random()*(world.height-200);if(occupied(x,y))continue;
  const rock=placed%5===0,name=rock?['large-water-rock','medium-water-rock','small-water-rock'][placed%3]:'water-foam';
  const el=sprite(stage,name,x,y,rock?3.1+random()*1.2:2.8+random()*1.7,placed);
  if(!el)continue;el.classList.add('sea-wave',rock?'sea-rock':'sea-ripple');placed++;
 }
 const boats=world.width<2000?[[.1,.44,0,-18],[.94,.58,1,24],[.47,.30,2,-35]]:[[.16,.12,0,-28],[.91,.57,1,26],[.48,.89,2,-50]];
 boats.forEach(([x,y,frame,angle],n)=>{
  const boat=document.createElement('div');boat.className='sea-boat';boat.setAttribute('aria-hidden','true');
  boat.style.cssText=`left:${x*world.width}px;top:${y*world.height}px;--boat-angle:${angle}deg;--boat-delay:${-n*1.8}s;`;
  boat.innerHTML=`<span class="boat-wake"></span><span class="boat-sprite" style="background-image:url('${url('/scene-assets/sea-details/Wooden_boat/boat.png')}');background-position:-${frame*24}px 0"></span>`;
  stage.append(boat);
 });
}
