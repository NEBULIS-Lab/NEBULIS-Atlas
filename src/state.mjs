const fresh = () => ({version:1,profile:null,completed:[],xp:0,builds:[],posts:[],streak:[]});
export function loadState(raw) {
  try { const value=typeof raw==='string'?JSON.parse(raw):raw;if(!value || typeof value!=='object')return fresh();
    const s={...fresh(),...value};
    for(const key of ['completed','builds','posts','streak'])if(!Array.isArray(s[key]))s[key]=[];
    s.completed=[...new Set(s.completed.filter(x=>typeof x==='string'&&x.startsWith('/')))];
    s.xp=s.completed.length*15;
    if(s.profile && typeof s.profile.name!=='string')s.profile=null;
    return s;
  }catch{return fresh();}
}
export function completeLesson(state,route){const s=loadState(state);if(!s.completed.includes(route))s.completed=[...s.completed,route];s.xp=s.completed.length*15;return s;}
export function courseProgress(state,course){return state.completed.filter(x=>x.startsWith('/'+course+'/')).length;}
export function saveBuild(state,build){const s=loadState(state);const clean={id:String(build.id),title:String(build.title||'Untitled Build'),language:String(build.language||'html'),code:String(build.code||'')};const index=s.builds.findIndex(b=>b.id===clean.id);s.builds=[...s.builds];if(index<0)s.builds.push(clean);else s.builds[index]=clean;return s;}
