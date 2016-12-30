# Honoka

[![Build Status by Travis CI](https://travis-ci.org/windyakin/Honoka.svg?branch=v4-dev)](https://travis-ci.org/windyakin/Honoka)
[![Build status by AppVeyor](https://ci.appveyor.com/api/projects/status/6j4y6bugti7f1aff/branch/v4-dev?svg=true)](https://ci.appveyor.com/project/windyakin/honoka/branch/v4-dev)
[![devDependency Status](https://david-dm.org/windyakin/Honoka/dev-status.svg)](https://david-dm.org/windyakin/Honoka#info=devDependencies)
[![The MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[http://honokak.osaka/](http://honokak.osaka/)

[![Honoka](docs/assets/img/sample.png)](http://honokak.osaka/)

"Honoka" は日本語も美しく表示できるBootstrapテーマです。

## About "Honoka"

通常の[Bootstrap](http://getbootstrap.com/)では，日本語のフォント指定や文字サイズは最適とはいえません。"Honoka"はそんなBootstrapをベースに，日本語表示に適したフォント指定や，文字サイズに関するコードを追記したBootstrapテーマの一つです。

## Live Demo

**[http://v4-alpha.honokak.osaka/bootstrap.html](http://honokak.osaka/bootstrap.html) **

## Getting Started

### Download

[Releases](https://github.com/windyakin/Honoka/releases)から最新版をダウンロードしてください。

### Bower

[Bower](http://bower.io/)からインストールすることができます。

最新版をインストールするには以下のコマンドを実行してください。

```
bower install --save-dev $(node -e "$(curl -fsSL https://cdn.honokak.osaka/last.js)" windyakin Honoka)
```

もしcURLが入っていない環境の場合には、

```
bower install --save-dev Honoka#(version)
```

``(version)``にはバージョン番号を指定します(ex. ``Honoka#3.3.5-c``)。Honokaの最新バージョン番号は[Releases](https://github.com/windyakin/Honoka/releases)から確認してください。

## Usage

Honokaは単なるBootstrapテーマにしか過ぎないため，基本的な使い方は本家Bootstrapとほとんど変わりません。よって以下に書くことは[本家Bootstrap](http://v4-alpha.getbootstrap.com/getting-started/)からの引用，もしくはその一部を変更したものです。用意されたCSSクラスやコンポーネントなど，より詳細な使い方のドキュメントは本家Bootstrapの各種リファレンスページをご覧になることを推奨します。

 * [Documentation](http://v4-alpha.getbootstrap.com/getting-started/introduction/)

### Package

配布しているzipファイルの内容物は以下のとおりです。``bootstrap.min.*``といったように，ファイル名に``min``がつくファイルは，改行やインデント・スペーシングをなくした(minifyされた)コードで，ユーザがウェブページを読み込む際の転送量を少なくすることができます。通常はこの``bootstrap.min.*``を使うことをおすすめします。

```
honoka/
├─ bootstrap.html
├─ css/
│   ├─ bootstrap.css
│   └─ bootstrap.min.css
└─ js/
     ├─ bootstrap.js
     └─ bootstrap.min.js
```

### Basic Template

Bootstrapをつかってウェブページを作成する際に基本となるHTML部分は以下のようになります。CSSやJavaScriptのファイルパスは環境に合わせて変更する必要があります。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <!-- Required meta tags always come first -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">

    <title>Bootstrap Template</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
  </head>
  <body>
    <h1>Hello, world!</h1>

    <!-- jQuery first, then Tether, then Bootstrap JS. -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js" integrity="sha384-3ceskX3iaEnIogmQchP8opvBy3Mi7Ce34nWjpBIwVTHfGYWQS9jwHDVRnpKKHJg7" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.3.7/js/tether.min.js" integrity="sha384-XTs3FgkjiBgo8qjEjBk0tGmf3wPrWtA6coPfQDfFEY8AnYJwjalXCiosYRBIBZX8" crossorigin="anonymous"></script>
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
```

### Do you hate "YuGothic"?

もしあなたが日本語フォントに游ゴシックを指定したくない場合，その要素に対して``.no-thank-yu``(※``you``ではなく``yu``)を指定することで游ゴシックの指定はされなくなり，Windowsであればメイリオ，Mac OS Xであればヒラギノ角ゴを優先的に使用するようになります。

例えばページ全体に対して游ゴシックを用いたくない場合は，``<body>``に対して``.no-thank-yu``を指定(``<body class="no-thank-yu">``)することで，ページ全体で游ゴシックは使用されなくなります。

## Build

ビルドの方法については [Wiki](https://github.com/windyakin/Honoka/wiki) をご覧ください。

## License

[MIT License](LICENSE)

## Author

 * windyakin ([windyakin.net](http://windyakin.net/))
