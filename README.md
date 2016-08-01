# Nico

[![Build Status](https://travis-ci.org/kubosho/Nico.svg?branch=master)](https://travis-ci.org/kubosho/Nico)
[![devDependency Status](https://david-dm.org/kubosho/Nico/dev-status.svg)](https://david-dm.org/kubosho/Nico#info=devDependencies)
[![The MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

"Nico"は"[Honoka](https://github.com/windyakin/Honoka)"を元にした、日本語も美しく表示できるBootstrapテーマです。

## About "Nico"

通常の[Bootstrap](//getbootstrap.com/)では，日本語のフォント指定や文字サイズは最適とはいえません。
"Honoka"はそんなBootstrapをベースに，日本語表示に適したフォント指定や，文字サイズに関するコードを追記したBootstrapテーマの一つです。
"Nico"は"Honoka"を元に、ピンク系の配色を適用したテーマです。

## Live Demo

 * [Nico/bootstrap-ja.html](http://nico.kubosho.com/bootstrap-ja.html) (日本語レイアウト)
 * [Nico/bootstrap.html](http://nico.kubosho.com/bootstrap.html) (英語レイアウト)

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
bower install --save-dev Nico#(version)
```

``(version)``にはバージョン番号を指定します(ex. ``Nico#3.3.6-1.1.0``)。Nicoの最新バージョン番号は[Relases](https://github.com/kubosho/Nico/releases)から確認してください。

## Usage

Nicoは単なるBootstrapテーマにしか過ぎないため，基本的な使い方は本家Bootstrapとほとんど変わりません。
よって以下に書くことは[本家Bootstrap](//getbootstrap.com/getting-started/)からの引用，もしくはその一部を変更したものです。
用意されたCSSクラスやコンポーネントなど，より詳細な使い方のドキュメントは本家Bootstrapの各種リファレンスページをご覧になることを推奨します。

 * [CSS](//getbootstrap.com/css/)
 * [Components](//getbootstrap.com/components/)
 * [JavaScript](//getbootstrap.com/javascript/)

### Package

配布しているzipファイルの内容物は以下のとおりです。
``bootstrap.min.*``といったように，ファイル名に``min``がつくファイルは，改行やインデント・スペーシングをなくした(minifyされた)コードで，ユーザがウェブページを読み込む際の転送量を少なくすることができます。通常はこの``bootstrap.min.*``を使うことをおすすめします。

```
nico/
├─ bootstrap.html
├─ css/
│   ├─ bootstrap.css
│   └─ bootstrap.min.css
├─ fonts/
│   ├─ glyphicons-halflings-regular.eot
│   ├─ glyphicons-halflings-regular.svg
│   ├─ glyphicons-halflings-regular.ttf
│   ├─ glyphicons-halflings-regular.woff
│   └─ glyphicons-halflings-regular.woff2
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
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <h1>Hello, world!</h1>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
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

## Author of "Honoka"

- windyakin ([windyakin.net](//windyakin.net/))

## Editor of "Nico"

- kubosho ([blog.kubosho.com](//blog.kubosho.com/))
