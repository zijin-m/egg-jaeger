# egg-jaeger

`Jaeger` 链路追踪插件。支持功能：

1. `Http` 调用链路。
2. `Sequelize` 的 `SQL`语句跟踪。
3. `Redis` 的 `Command`命令跟踪。

### 效果图

![](https://raw.githubusercontent.com/zijin-m/egg-jaeger/master/assets/demo.png)

## Install

```bash
$ npm i @zijin-m/egg-jaeger --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.jaeger = {
  enable: true,
  package: 'egg-jaeger'
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.jaeger = {
  serviceName: 'your-awesome-service',
  sampler: {
    type: 'const',
    param: 1
  },
  reporter: {
    // Provide the traces endpoint; this forces the client to connect directly to the Collector and send
    // spans over HTTP
    collectorEndpoint: 'http://jaeger-collector:14268/api/traces'
    // Provide username and password if authentication is enabled in the Collector
    // username: '',
    // password: '',
  },
  sequelize: false, // 默认不开启sequelize记录
  redis: false //默认不开启redis记录
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
