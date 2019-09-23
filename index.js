'use strict';
const { FORMAT_HTTP_HEADERS, Tags } = require('opentracing');

module.exports = {
  httpRpc: () => {
    return function(target, propertyKey, descriptor) {
      const func = descriptor.value;

      descriptor.value = async function(...args) {
        if (!this.ctx || !this.ctx.app || !this.ctx.app.tracer || !this.ctx.rootSpan) {
          return func;
        }
        const tracer = this.ctx.app.tracer;
        const rootSpan = this.ctx.rootSpan;
        let options;
        if (typeof args[0] === 'string') {
          options = args[1] || {};
          options.url = args[0];
        } else {
          options = args[0];
        }
        const method = options.method || 'GET';
        options.headers = options.headers || {};
        const spanOptions = {
          tags: {
            [Tags.HTTP_METHOD]: method,
            [Tags.HTTP_URL]: options.url,
            'http.req_body': options.data || {},
          },
          childOf: rootSpan,
        };
        const span = tracer.startSpan(`HTTP ${method}`, spanOptions);
        tracer.inject(span, FORMAT_HTTP_HEADERS, options.headers);
        try {
          const res = await func.apply(this, args);
          span.finish();
          return res;
        } catch (err) {
          span.setTag(Tags.ERROR, true);
          span.log({
            event: 'ERROR_HTTP_REQUEST',
            message: err.message,
            stack: err.stack,
          });
          span.finish();
          throw err;
        }
      };
    };
  },
};
