//引入远程js，加载完成后执行相应方法
function loadJs(src,ref) {
    return new Promise((resolve,reject)=>{
      let script = document.createElement('script');
      script.type = "text/javascript";
      script.src= src;
      script.id = 'clstr_globe'
      ref.appendChild(script);
      console.log(script);  
      script.onload = ()=>{
        resolve();
      }
      script.onerror = ()=>{
        reject();
      }
    })
  }
   
  export default loadJs