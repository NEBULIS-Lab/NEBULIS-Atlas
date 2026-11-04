import {loadPyodide} from './vendor/pyodide/pyodide.mjs';
let runtime;
self.onmessage=async({data})=>{
 try{
  if(!runtime){runtime=await loadPyodide({indexURL:new URL('./vendor/pyodide/',self.location.href).href});}
  let output=[];runtime.setStdout({batched:s=>output.push(s)});runtime.setStderr({batched:s=>output.push(s)});
  let inputs=(data.stdin||'').split('\n');runtime.setStdin({stdin:()=>inputs.length?inputs.shift():null});
  const globals=runtime.toPy({});try{await runtime.runPythonAsync(data.code,{globals});}finally{globals.destroy();}
  postMessage({ok:true,output:output.join('\n')||'Program finished with no output.'});
 }catch(error){postMessage({ok:false,output:String(error)});}
};
