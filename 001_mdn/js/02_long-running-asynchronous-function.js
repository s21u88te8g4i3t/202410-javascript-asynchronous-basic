// 引用元: https://developer.mozilla.org/ja/docs/Learn/JavaScript/Asynchronous/Introducing を一部async関数化
// 長時間実行される同期関数をasync関数化したりPromiseを利用しても
// メインスレッド上で動作する場合はウィンドウ全体が反応しなくなる ※ワーカーの使用が必要

console.log('#### 02_long-running-asynchronous-function.js ####');

const MAX_PRIME = 1000000;

function isPrime(n) {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return n > 1;
}

const random = (max) => Math.floor(Math.random() * max);

async function generatePrimes(quota) {
  const primes = [];
  console.time('generatePrimesWhile');
  while (primes.length < quota) {
    const candidate = random(MAX_PRIME);
    if (isPrime(candidate)) {
      primes.push(candidate);
    }
  }
  console.timeEnd('generatePrimesWhile');
  return primes;
}
/** log
  #### 02_long-running-asynchronous-function.js ####
  02_long-running-asynchronous-function.js:37 generatePrimes bef
  02_long-running-asynchronous-function.js:29 generatePrimesWhile: 4490.486083984375 ms
  02_long-running-asynchronous-function.js:36 [Violation] 'click' handler took 4491ms
  02_long-running-asynchronous-function.js:39 generatePrimes aft
 */

const quota = document.querySelector('#quota');
const output = document.querySelector('#output');

document.querySelector('#generate').addEventListener('click', async () => {
  console.log('generatePrimes bef');
  const primes = await generatePrimes(quota.value);
  console.log('generatePrimes aft');
  output.textContent = `${quota.value} 個の素数を生成しました。`;
});

document.querySelector('#reload').addEventListener('click', () => {
  document.location.reload();
});
