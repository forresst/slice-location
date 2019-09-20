# slice-location

String slices by line and column indexes

[![Travis Build Status](https://travis-ci.org/forresst/slice-location.svg?branch=master)](https://travis-ci.org/forresst/slice-location)
[![Coverage Status](https://coveralls.io/repos/github/forresst/slice-location/badge.svg)](https://coveralls.io/github/forresst/slice-location)
[![version](https://img.shields.io/npm/v/slice-location.svg?style=flat-square)](https://www.npmjs.com/package/slice-location)
[![node-version](https://img.shields.io/badge/node-%3E%3D%208.0-orange.svg?style=flat-square)](https://nodejs.org)
[![downloads](https://img.shields.io/npm/dm/slice-location.svg?style=flat-square)](http://npm-stat.com/charts.html?package=slice-location)

[![MIT License](https://img.shields.io/npm/l/slice-location.svg?style=flat-square)](https://github.com/forresst/slice-location/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](https://github.com/forresst/slice-location/blob/master/CODE_OF_CONDUCT.md)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

[![Watch on GitHub](https://img.shields.io/github/watchers/forresst/slice-location.svg?style=social)](https://github.com/forresst/slice-location/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/forresst/slice-location.svg?style=social)](https://github.com/forresst/slice-location/stargazers)


## Table of Contents

<!-- ⛔️ AUTO-GENERATED-CONTENT:START (TOC) -->
- [Installation](#installation)
- [Usage](#usage)
  * [Node.js](#nodejs)
- [API](#api)
  * [sliceLocation(input, options)](#slicelocationinput-options)
    + [input](#input)
    + [options](#options)
    + [return](#return)
    + [Example](#example)
- [LICENSE](#license)
<!-- ⛔️ AUTO-GENERATED-CONTENT:END -->

## Installation

This module is distributed via [npm](https://www.npmjs.com/) which is bundled with [node](https://nodejs.org) and should be installed as one of your project's `devDependencies`:

```console
npm install --save-dev slice-location
```

## Usage

### Node.js

```js
const sliceLocation = require('slice-location');

const inputString = `Line 1
Line 2

Line 4
Line 5

Line 7
`;

const options = {beginLine: 4, beginColumn: 1, endLine: 5, endColumn: 2, offsetLine: 1, offsetColumn: 1};
console.log(sliceLocation(inputString));
//=> Line 4
//=> Li
```

## API

### sliceLocation(input, options)

Slice a string by line and column indexes. Returns a `string` sliced.

#### input

Type: `string`

The string to slice.

#### options

Type: `object`

- `beginLine`: The line number where the slice begins.
  - Type: `number`
  - Default: `0`
- `beginColumn`: The column number where the slice begins.
  - Type: `number`
  - Default: `0`
- `endLine`: The line number where the slice ends.
  - Type: `number`
  - Default: The number of the last line of the string
- `endColumn`: The column number where the slice ends.
  - Type: `number`
  - Default: The number of the last column of the last line of the string
- `offsetLine`: by default, the value of the first line is `0`. If you need the first line begin at `1` or more, set `offsetLine` in the `option` parameter object to the desired value.
  - Type: `number`
  - Default: `0`
- `offsetColumn`: by default, the value of the first column is `0`. If you need the first line begin at `1` or more, set `offsetColumn` in the `option` parameter object to the desired value.
  - Type: `number`
  - Default: `0`

#### return

Type: `string`

The string sliced.

#### Example

`index.js`:

> ```js
>
> const sliceLocation = require('slice-location');
>
> const inputString = `Line 1
> Line 2
>
> Line 4
> Line 5
>
> Line 7
> `;
>
> const options = {beginLine: 4, beginColumn: 1, endLine: 5, endColumn: 2, offsetLine: 1, offsetColumn: 1};
> console.log(sliceLocation(inputString));
> //=> Line 4
> //=> Li
> ```

## LICENSE

<!-- ⛔️ AUTO-GENERATED-CONTENT:START (PKGJSON:template=${license}) -->
MIT
<!-- ⛔️ AUTO-GENERATED-CONTENT:END -->
