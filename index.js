'use strict';
const { FORMAT_HTTP_HEADERS, Tags } = require('opentracing');

module.exports = {
  httpRpc: () => {
    return function(target, propertyKey, descriptor) {
      const func = descriptor.value;
      if (!this.app || !this.app.tracer) {
        return func;
      }
      descriptor.value = async function(...args) {
        let [ url, options = {} ] = args;
        if (typeof url === 'object') {
          options = url;
        } else {
          options.url = url;
        }
        const method = options.method || 'GET';
        options.headers = options.headers || {};
        const spanOptions = {
          tags: {
            [Tags.HTTP_METHOD]: method,
            [Tags.HTTP_URL]: options.url,
            'http.req_body': options.data || {},
          },
          childOf: this.rootSpan,
        };
        const span = this.app.startSpan(`HTTP ${method}`, spanOptions);
        this.app.tracer.inject(span, FORMAT_HTTP_HEADERS, options.headers);
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
        }
      };
    };
  },
};
