// 01_loadScript_error-first-callback.js

function loadScript(src, callback) {
  const scriptElem = document.createElement('script');
  scriptElem.src = src;

  scriptElem.onload = () => callback(null, scriptElem);
  scriptElem.onerror = () => callback(new Error(`load error ${src}`));

  document.head.append(scriptElem);
}
