// 01_main_error-first-callback.js

(() => {
  console.log('start');
  const output = document.querySelector('#output');
  let value = 0;

  loadScript('./js/addOne.js', (error, scriptElem) => {
    if (error) {
      handleError(error);
      return;
    }
    log(scriptElem);
    loadScript('./js/addTwo.js', (error, scriptElem) => {
      if (error) {
        handleError(error);
        return;
      }
      log(scriptElem);
      loadScript('./js/addFive.js', (error, scriptElem) => {
        if (error) {
          handleError(error);
          return;
        }
        log(scriptElem);
        value = addOne(value);
        value = addTwo(value);
        value = addFive(value);
        output.textContent = value;
      });
    });
  });

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
