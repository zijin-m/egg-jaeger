'use strict';
const { initTracer } = require('jaeger-client');
const { getSpanContext } = require('../../lib/store');

const APPLICATION_JAEGER = Symbol('application_jaeger');

module.exports = {
  get tracer() {
    if (!this[APPLICATION_JAEGER]) {
      const config = this.config.jaeger;
      const options = {
        tags: {
          'egg-jaeger-version': '1.0.0',
        },
      };
      this[APPLICATION_JAEGER] = initTracer(config, options);
    }
    return this[APPLICATION_JAEGER];
  },
  startSpan(name, options = {}) {
    const childOf = options.childOf || getSpanContext();
    const span = this.tracer.startSpan(
      name,
      childOf ? { childOf, tags: options.tags } : { tags: options.tags }
    );
    return span;
  },
};
