'use strict';

/**
 * egg-jaeger default config
 * @member Config#jaeger
 * @property {String} SOME_KEY - some description
 */
exports.jaeger = {
  serviceName: 'your-service-name',
  sampler: {
    type: 'const',
    param: 1,
  },
  reporter: {
    // Provide the traces endpoint; this forces the client to connect directly to the Collector and send
    // spans over HTTP
    collectorEndpoint: 'http://jaeger-collector:14268/api/traces',
    // Provide username and password if authentication is enabled in the Collector
    // username: '',
    // password: '',
  },
  sequelize: false,
  redis: false,
  middlewareIndex: 1,
};
