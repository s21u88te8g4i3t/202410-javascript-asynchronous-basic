// 02.5_main_async-await

(async () => {
  console.log('start');

  try {
    const output = document.querySelector('#output');
    let value = 0;

    const scriptElemOne = await loadScript('./js/addOne.js');
    log(scriptElemOne);
    const scriptElemTwo = await loadScript('./js/addTwo.js');
    log(scriptElemTwo);
    const scriptElemFive = await loadScript('./js/addFive.js');
    log(scriptElemFive);

    value = addOne(value);
    value = addTwo(value);
    value = addFive(value);
    output.textContent = value;
  } catch (error) {
    handleError(error);
  }

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
