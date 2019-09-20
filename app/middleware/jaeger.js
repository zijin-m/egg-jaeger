'use strict';
const { FORMAT_HTTP_HEADERS, Tags } = require('opentracing');
const { setSpanContext } = require('../../lib/store');

module.exports = (options, app) => async (ctx, next) => {
  const tracer = app.tracer;
  const spanOptions = {
    tags: {
      [Tags.HTTP_METHOD]: ctx.method,
      [Tags.HTTP_URL]: ctx.url,
      'http.req_body': ctx.request.body,
    },
  };
  const parentSpan = tracer.extract(FORMAT_HTTP_HEADERS, ctx.headers);
  if (parentSpan) {
    spanOptions.childOf = parentSpan;
  }
  const span = app.startSpan(`HTTP ${ctx.method}`, spanOptions);
  ctx.rootSpan = span;
  setSpanContext(span);
  ctx.tracer.traceId = span.context().traceIdStr;
  try {
    await next();
    span.setTag(Tags.HTTP_STATUS_CODE, ctx.status);
    span.log({
      event: 'http.res_body',
      message: ctx.body,
    });
    span.finish();
    if (ctx.body && typeof ctx.body === 'object') {
      ctx.body.traceId = ctx.tracer.traceId;
    }
  } catch (error) {
    span.setTag(Tags.ERROR, true);
    span.log({
      event: Tags.ERROR,
      message: error.message,
      stack: error.stack,
    });
    span.finish();
    throw error;
  }
};
