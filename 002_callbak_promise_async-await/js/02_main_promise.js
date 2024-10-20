// 02_main_promise.js

(() => {
  console.log('start');
  const output = document.querySelector('#output');
  let value = 0;

  loadScript('./js/addOne.js')
    .then((scriptElem) => {
      log(scriptElem);
      return loadScript('./js/addTwo.js');
    })
    .then((scriptElem) => {
      log(scriptElem);
      return loadScript('./js/addFive.js');
    })
    .then((scriptElem) => {
      log(scriptElem);
      value = addOne(value);
      value = addTwo(value);
      value = addFive(value);
      output.textContent = value;
    })
    .catch((error) => handleError(error));

  console.log('end');
})();

function log(scriptElem) {
  console.log(`script -> ${scriptElem.src} loaded`);
}

function handleError(error) {
  const errorMessage = `Error -> ${error.message}`;
  console.error(errorMessage);
  const output = document.querySelector('#output');
  output.textContent = errorMessage;
}
