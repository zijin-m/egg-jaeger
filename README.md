# egg-jaeger

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-jaeger.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-jaeger
[travis-image]: https://img.shields.io/travis/eggjs/egg-jaeger.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-jaeger
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-jaeger.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-jaeger?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-jaeger.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-jaeger
[snyk-image]: https://snyk.io/test/npm/egg-jaeger/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-jaeger
[download-image]: https://img.shields.io/npm/dm/egg-jaeger.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-jaeger

<!--
Description here.
-->

## Install

```bash
$ npm i egg-jaeger --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.jaeger = {
  enable: true,
  package: 'egg-jaeger',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.jaeger = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
