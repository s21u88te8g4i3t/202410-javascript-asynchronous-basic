console.log('#### 04_processing-order.js ####');

const mainLogger = createLogger('main');
mainLogger.start();

initialize();
mainLogger.log('initialize : execute : after');

mainLogger.log(
  'initialize : declaration : befor -> 関数宣言の前後にログ出力やdebuggerを仕込む価値は少ない'
);

// ------------------------------------------------------------------
// initialize :: () -> void
async function initialize() {
  const logger = createLogger('initialize');
  logger.start();
  try {
    logger.log('[1.await waitFor 1000] befor [01] -> 0ms');
    await waitFor(1000);
    logger.log('[1.await waitFor 1000] after [02] -> 0 + 1000 = 1000ms');

    logger.log('[2.no await waitFor 1000] befor [03] -> 1000ms');
    waitFor(1000);
    logger.log(
      '[2.no await waitFor 1000] after [04] -> 1000 + 0(async 1000) = 1000ms...awaitキーワード未使用、thenハンドラー未使用（プロミスチェーン外)のためプロミスの決定を待たない'
    );

    logger.log('[3.no await waitFor 1500 .then] befor [05] -> 1000ms');
    waitFor(1500)
      .then(() => {
        logger.log(
          '[3.no await waitFor 1500 .then] .then1 [13] -> 1000 + 1500 = 2500ms...awaitキーワード未使用だが、thenハンドラーを使用している（プロミスチェーンに含まれる)ためプロミスの決定を待つ'
        );
      })
      .then(() => {
        logger.log('[3.no await waitFor 1500 .then] .then2 [14] -> 2500ms');
      });
    logger.log(
      '[3.no await waitFor 1500 .then] .then after [06] -> 1000 + 0(async 1500) = 1000ms...awaitキーワード未使用、thenハンドラー未使用（プロミスチェーン外)のためプロミスの決定を待たない'
    );

    logger.log('[4.no await waitFor 900 .then] befor [07] -> 1000ms');
    waitFor(900)
      .then(() => {
        logger.log(
          '[4.no await waitFor 900 .then] .then 1 [12] -> 1000 + 900 = 1900ms...awaitキーワード未使用だが、thenハンドラーを使用している（プロミスチェーンに含まれる)ためプロミスの決定を待つ'
        );
      })
      .then(() => waitFor(900))
      .then(() => {
        logger.log(
          '[4.no await waitFor 900 .then] .then 1 .waitFor 800 .then 2 [16] -> 1900 + 900 = 2800ms...awaitキーワード未使用だが、thenハンドラーを使用している（プロミスチェーンに含まれる)ためプロミスの決定を待つ'
        );
      });
    logger.log(
      '[4.no await waitFor 900 .then] after [08] -> 1000 + 0(async 900) = 1000ms...awaitキーワード未使用、thenハンドラー未使用（プロミスチェーン外)のためプロミスの決定を待たない'
    );

    logger.log('[5.await waitFor 600] befor [09] -> 1000ms');
    await waitFor(600);
    logger.log('[5.await waitFor 600] after [10] -> 1000 + 600 = 1600ms');

    logger.log('[6.await waitFor 1200] befor [11] -> 1600ms');
    await waitFor(1100);
    logger.log('[6.await waitFor 1200] after [15] -> 1600 + 1100 = 2700ms');
  } finally {
    logger.end();
  }
}

mainLogger.log(
  'initialize : declaration : after -> 関数宣言の前後にログ出力やdebuggerを仕込む価値は少ない'
);

// ------------------------------------------------------------------
// createLogger :: string -> Object
function createLogger(tag = '') {
  const label = `[${tag}]`;
  let isFinished;
  const logger = {
    start() {
      console.log(label, '[Start]');
      console.time(label);
    },
    log(data) {
      if (!isFinished) {
        console.timeLog(label, '[Time]', data);
      } else {
        console.log(label, '[Log after End]', data);
      }
    },
    end() {
      console.timeEnd(label);
      console.log(label, '[End]');
      isFinished = true;
    },
  };
  return logger;
}

mainLogger.log(
  'createLogger : declaration : after -> 関数宣言の前後にログ出力やdebuggerを仕込む価値は少ない'
);

// ------------------------------------------------------------------
// waitFor :: number -> Promise<void>
async function waitFor(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

mainLogger.log(
  'waitFor : declaration : after -> 関数宣言の前後にログ出力やdebuggerを仕込む価値は少ない'
);

// initialize();
// mainLogger.log('initialize : execute : after');

mainLogger.end();
