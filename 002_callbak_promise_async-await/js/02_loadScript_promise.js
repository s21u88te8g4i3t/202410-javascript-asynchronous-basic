// 02_loadScript_promise.js

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const scriptElem = document.createElement('script');
    scriptElem.src = src;

    scriptElem.onload = () => resolve(scriptElem);
    scriptElem.onerror = () => reject(new Error(`load error ${src}`));

    document.head.append(scriptElem);
  });
}
