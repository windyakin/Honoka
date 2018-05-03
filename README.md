# Honoka

[![Build Status by Travis CI](https://travis-ci.org/windyakin/Honoka.svg?branch=master)](https://travis-ci.org/windyakin/Honoka)
[![Build status by AppVeyor](https://ci.appveyor.com/api/projects/status/6j4y6bugti7f1aff/branch/master?svg=true)](https://ci.appveyor.com/project/windyakin/honoka/branch/master)
[![devDependency Status](https://david-dm.org/windyakin/Honoka/dev-status.svg)](https://david-dm.org/windyakin/Honoka#info=devDependencies)
[![The MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/bootstrap-honoka.svg)](https://www.npmjs.com/package/bootstrap-honoka)

[http://honokak.osaka/](http://honokak.osaka/)

[![Honoka](docs/assets/img/sample.png)](http://honokak.osaka/)

"Honoka" は日本語も美しく表示できる Bootstrap テーマです。

## About "Honoka"

通常の [Bootstrap](http://getbootstrap.com/) では、日本語を表示した時にそのフォント指定やウェイトが最適とはいえません。 "Honoka" は Bootstrap をベースに、日本語表示に適したフォントの指定や、ウェイトに関するコードを追記した Bootstrap テーマです。

## Live Demo

* [http://honokak.osaka/bootstrap-ja.html](http://honokak.osaka/bootstrap-ja.html) (日本語レイアウト)
* [http://honokak.osaka/bootstrap.html](http://honokak.osaka/bootstrap.html) (英語レイアウト)

## Getting Started

### Download

[Releases](https://github.com/windyakin/Honoka/releases) ページから最新版をダウンロードしてください。

### npm

Node.js のパッケージ管理システムである、 [npm](https://npmjs.com) からダウンロードすることができます。 [webpack](https://webpack.js.org/) など、npmを利用したmodule bundlerでご利用ください。

```
npm install --save bootstrap-honoka
```

パッケージ名が「**bootstrap-**honoka」であることに注意してください。

### Bower

[Bower](http://bower.io/) からインストールすることができます。

最新版をインストールするには以下のコマンドを実行してください。

```
bower install --save-dev $(node -e "$(curl -fsSL https://cdn.honokak.osaka/last.js)" windyakin Honoka)
```

もしcURLが入っていない環境の場合には、

```
bower install --save-dev Honoka#(version)
```

`(version)` には Honoka のバージョン番号を指定します(ex. `Honoka#3.3.5-c`)。 Honoka の最新バージョン番号は [Releases](https://github.com/windyakin/Honoka/releases) ページから確認してください。

## Usage

Honoka は単なる Bootstrap のテーマにしか過ぎないため、基本的な使い方は Bootstrap とほとんど変わりません。よって以下に書くことは [Bootstrap](http://getbootstrap.com/getting-started/) からの引用、もしくはその一部を変更したものです。Bootstrap によって用意されているCSSクラスやコンポーネントなど、より詳細な使い方のドキュメントは Bootstrap の各種リファレンスページをご覧になることを推奨します。

* [CSS](http://getbootstrap.com/css/)
* [Components](http://getbootstrap.com/components/)
* [JavaScript](http://getbootstrap.com/javascript/)

### Package

配布している ZIP ファイルの内容物は以下のとおりです。 `bootstrap.min.css` といったように、ファイル名に `min` がついているファイルは、改行やインデント・スペーシングをなくした(minifyされた)コードで、ユーザがウェブページを読み込む際の転送量を少なくすることができます。通常はこの `bootstrap.min.*` を使うことをおすすめします。

```
honoka/
├─ LICENSE
├─ README.md
├─ bootstrap.html
├─ css/
│  ├─ bootstrap.css
│  └─ bootstrap.min.css
└─ js/
    ├─ bootstrap.bundle.js
    ├─ bootstrap.bundle.min.js
    ├─ bootstrap.js
    └─ bootstrap.min.js
```

### Do you hate "YuGothic"?

もしあなたが日本語フォントに游ゴシックを指定したくない場合、その要素に対して `.no-thank-yu` (※ `you` ではなく `yu`) を指定することで游ゴシックの指定はされなくなり、 Windows 環境であれば「メイリオ」、 macOS 環境であればヒラギノ角ゴを優先的に使用するようになります。

例えばページ全体に対して游ゴシックを用いたくない場合は、 `<body>` に対して `.no-thank-yu` を指定 (`<body class="no-thank-yu">`) することで、ページ全体で游ゴシックは使用されなくなります。

## Build

ビルドの方法については [Wiki](https://github.com/windyakin/Honoka/wiki) をご覧ください。

## License

[MIT License](LICENSE)

## Author

* windyakin ([@MITLicense](https://twitter.com/MITLicense))
