# UiGenerator

## 概要

特定の HTML に UI パーツを付与するスクリプト。

ui 設定情報を元に必要な HTML を読み取り、指定のクラスに付与する。

UI パーツは必要なものを付与し、不要なものは付与しない。

順番等を設定できるようにしたい。

## パッケージ解説

- ui-generator
  - controller.js
  - components
    - bodys
      - component.html
    - scripts
      - component.js

### ui-generator

パッケージ

### controller.js

設定ファイルを元に component を呼び出す

### components

コンポーネントの保存場所

### bodys

コンポーネントの HTML

### scripts

コンポーネントの動作を制御する js

## 備考

現時点での構想であるため、変更の可能性あり。
特にコンポーネントについては、yaml や json 等での管理を検討する。

mavon-editor.js のプレビューの中身（見えてる部分）は

```
document.getElementsByClassName("v-show-content").item("innerHTML")
```

で取得できる。

# Good Morning World

どれほど歩いたろう？　足の痛みだけがその距離を物語る
永い夜を超えた　絶景への期待が　今日僕を生かしている

神々の霊峰　新緑の宮殿　岩窟の最奥　蒼穹の果て

踏破してみせる　限界は無い　星の隅々まで

おはよう世界！　 Good Morning World！

不可能の闇を払って　神話を日常に変えていく　 Odyssey

苔生す意思に導かれ　世界を広げよう

さあ今日も --- 人間を始めよう！！

[チーム Wiki](https://www.notion.so/Wiki-d1408f3969fa40d196cf123cac973d9f)

[フロントエンド](https://www.notion.so/0ae2a194202142bd84f63e5cc56abb3e)

---

## 目次

---

## 参考サイト

---

## コメント

---

- コメント欄(コメントする時に名前あると親切かも？)

## 概要

---

プロジェクトの UI を設定するスクリプト、およびデータフローを考察する

### 前提

「ＵＩをパーツごとにファイル分け（コンポーネント化）して、JS で作成した司令塔が設定ファイルを元に、必要に応じて読み込み・適用する」というものを最初の構想として制作を開始することにした。

まず純粋な HTML CSS JavaScript の形に近づけて実験を開始したが、HTML ファイルを JS で読み込むのはあまり賢いやり方ではないようだ。

純粋な JS から HTML(及びその他のファイル)を読み込もうとすると、「ドメイン/ディレクトリ/ファイル名」を指定して API にアクセスするような形で取得する必要があったのだ。

JS ファイルから別のファイルを参照するのは、純粋な JS では少々手間がかかる上、あまり推奨されていないように感じた。

そのため、最初から純粋な言語のみで実現するのは諦めて一から練り直してみることにした。

## 考察

---

### 新構想

---

まず、ソースコードの再利用・可読性の向上のために、一連のロジックはいくつかの関数に分割したい。
nuxt.js のプラグイン関数として作成するようにすれば、管理も比較的簡単なのではないだろうか。

とはいえ、最終的にプロジェクトをエクスポートする際は純粋な言語のみで構成されている必要があるので、最初から最後まで nuxt.js で走り切ることはできない。

しかし、nuxt.js で作ろうが、他の手段で作ろうが、画面上に表示される際は完全に静的な HTML だ。
なので、エクスポートを行う際に HTML CSS JS になるようにまとめてしまえばいい。

何言ってんだ？何がしたいんだ？説明下手なんかこいつ。って思った人は会って話そう。直で話せば俺ちゃんの天才的説明力を本能で感じ取っていただけることだろう。

ﾁｮｳｼﾉﾘﾏｼﾀｻｰｾﾝ

### スクリプトの分割、保存

---

まず、なんやかんやしてボタンやら検索窓やらのデザインや機能を、パーツごとに疎結合になるように作成する。
vue、nuxt なんかのコンポーネントと同じ考え方。

そしてそれらをプレビュー画面に適応させる司令塔を立て、設定ファイルをもとに適応していく。(冒頭で話した形)
外観や動き自体はライブラリやフレームワークに頼らない純粋な HTML CSS JS で実現する。

問題は「パーツの情報をどうやって保持するのか？」という点だ。
最初に想定していたのは、パーツごとに HTML ファイル head タグや body タグなどは省く)を記述して、必要に応じて埋め込む形だった。しかし、HTML ファイルではなく json や yaml で保管しておくのも一つの手かもしれない。

というか個人的には、HTML ソースだけでなくパーツ名などの情報も保管できるようにしたいところである。

次に考えたいのは・・・保存方法・・・というより保存範囲？
パーツの分類ごとに「menu.json」「search.json」のような感じで、パーツ郡を一つの json ファイルにまとめるのか、パーツ 1 つごとに json ファイルを作成しディレクトリ別で保存するのか悩ましい。

ただ正直後者であれば、mysql でテーブル一個作れば良いのでは？という感じ。そもそもそんな大量にバリエーション豊かなパーツ郡を作成することも無いと思うので、今回は前者で十分な気がする。

あとは・・・圧縮しちゃう？(最近ファイルや文字列の圧縮を覚えたばかりなので使いたがる奴)

### デザインセットの適用

---

各所にカラー用のクラス「primary」や「secondary」のようなものを用意して、プロジェクト側のカラーをそのまま適用できるようにするか、自由に色を付けられるようにするか悩みどころ。

まぁぶっちゃけどっちでも余裕で作れるのであまり気にしなくてもよさそう。

### ロジックの流れと構造

---

- header と footer のエリアを生成する
  > body
      headerエリア
      mainエリア(mdを記述するエリア)
      footerエリア
  /body
  >
- header、footer それぞれに選択されているパーツを追加する
  - まず設計書通りに、その後順番等も指定できるように
  - header や footer 自体にもいくつかエリア分けとかデザインの指定ができたらいいな
    今回はやらないけどね
- 各パーツのスクリプトを追加して適用する

## 備考

---

- header と footer が親余白を無視して、親の親のＤＯＭに合わせる
  - この考え方自体間違ってるかもしれない。
  - header は絶対位置を使ってスクロール禁止にしたいところ
- header と footer のエリア分けにグリッドの概念を輸入したい

## 手順

### phase 1

- まずは header エリアとフッターエリアに関する HTML の記述を反映させる
- 余白を親の親に合わせてみる

### phase 2

- パーツを組み込めるようにする

### phase 3

- 単体でハンバーガーメニューが成立するコンポーネントを作成する
- ページ単位での search ができるようにする