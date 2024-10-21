# 202410-javascript-asynchronous-basic

非同期 JavaScript 基本（ブラウザ側）

## ポイント

- 現在の非同期処理はコールバックではなくプロミス(Promise)を使う
- ブラウザが提供する主要な非同期 API はプロミスベースで実装されているため
  プロミスの使い方を理解することが重要
- async と await キーワードを使用することで、連続した非同期関数呼び出し処理の構築を容易にし、  
  プロミスチェーンを避け、同期コードと同じように見えるコードを書くことを可能にする

## MDN リンクと要約

### 非同期 JavaScript

https://developer.mozilla.org/ja/docs/Learn/JavaScript/Asynchronous

- 非同期 JavaScript のガイド

### ★ Main thread (メインスレッド)

https://developer.mozilla.org/ja/docs/Glossary/Main_thread

- メインスレッドは、ブラウザーがユーザーのイベントや描画を処理するところ
- 既定では、ブラウザーは単一のスレッドを使用してページ内のすべての JavaScript を、  
  レイアウト、再フロー、ガベージコレクションなどと同様に実行する
- つまり、実行に時間がかかる JavaScript 関数がスレッドをブロックし、  
  ページが反応しなくなり、使い勝手が悪くなる

### ★ 非同期 JavaScript 入門

https://developer.mozilla.org/ja/docs/Learn/JavaScript/Asynchronous/Introducing

- ブラウザが提供する主要な API は非同期で実行されるものが多いため、  
  自分自身で非同期関数を実装することがなくても正しく使用できる必要がある
- 同期プログラミングについて  
  -> ブラウザーはプログラムを一度に一行ずつ、順番に処理を進めていく
- 長時間実行される同期関数の問題点 ★  
  -> 関数が実行されている間、ウィンドウ全体が反応しなくなる(ユーザイベントや画面描画含め無反応になる)
- その解決策 -> 長時間実行される同期関数を非同期化する
  - 関数を呼んで長時間実行する処理を開始する
  - その関数が処理を開始してすぐに値を返すようにすることで、プログラムが他のイベントにも応答できるようにする
  - 最終的に処理が完了したら、その結果を通知する
  - ...つまり「非同期処理が完了した」というイベントハンドラを使用して、非同期関数呼び出しの結果を呼び出し元に通知する
- イベントハンドラとコールバックについて
  - イベントハンドラーは、コールバックの一種
  - コールバックは単なる関数で、他の関数に渡され、適切なタイミングで呼び出されることを期待する
- 非同期プログラミングとコールバック地獄
  - コールバックは JavaScript で非同期関数を実装するための主な方法として使用されていた
- 現代の非同期 API のほとんどはコールバックではなくプロミス (Promise)を使用する

### ★ プロミスの使い方

https://developer.mozilla.org/ja/docs/Learn/JavaScript/Asynchronous/Promises

- プロミスを返す API を使用する方法
- fetch API
- async と await キーワード

### プロミスベースの API の実装方法

https://developer.mozilla.org/ja/docs/Learn/JavaScript/Asynchronous/Implementing_a_promise-based_API

- プロミスを返す API を実装する方法

### ワーカー入門

https://developer.mozilla.org/ja/docs/Learn/JavaScript/Asynchronous/Introducing_workers

- タスクを別個のスレッドで実行できるようにする ワーカー の紹介

### 【学習の評価】アニメーションを順番に再生する

https://developer.mozilla.org/ja/docs/Learn/JavaScript/Asynchronous/Sequencing_animations

## ポイントおさらい

- 現在の非同期処理はコールバックではなくプロミス(Promise)を使う
- ブラウザが提供する主要な非同期 API はプロミスベースで実装されているため
  プロミスの使い方を理解することが重要
- async と await キーワードを使用することで、連続した非同期関数呼び出し処理の構築を容易にし、  
  プロミスチェーンを避け、同期コードと同じように見えるコードを書くことを可能にする

## よくある？非同期処理シチュエーション

- HTTP リクエスト : fetch API
- DB アクセスやクラウドサービスの利用 : サードパーティ API
- (特定の画面項目の表示など)完了するまで待つ : setTimeout or setInterval or onload
