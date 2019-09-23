'use strict';
module.exports = {
  get enableAsyncHook() {
    const { sequelize, redis } = this.app.config.jaeger;
    return sequelize || redis;
  },
};
