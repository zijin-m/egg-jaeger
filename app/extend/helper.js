'use strict';
module.exports = {
  get enableAsyncHook() {
    return this.app.config.sequelize || this.app.config.redis;
  },
};
