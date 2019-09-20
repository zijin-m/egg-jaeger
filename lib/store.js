'use strict';
const asyncHooks = require('async_hooks');

const spanStore = new Map();

const asyncHook = asyncHooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    const parentSpan = spanStore.get(triggerAsyncId);
    if (parentSpan) {
      spanStore.set(asyncId, parentSpan);
    }
  },
  destroy(asyncId) {
    spanStore.delete(asyncId);
  },
});

asyncHook.enable();

function setSpanContext(span) {
  spanStore.set(asyncHooks.executionAsyncId(), span);
}

function getSpanContext() {
  return spanStore.get(asyncHooks.executionAsyncId());
}

module.exports = {
  setSpanContext,
  getSpanContext,
};
