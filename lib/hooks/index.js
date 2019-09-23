'use strict';
const hookSequelize = require('./sequelize');
const hookRedis = require('./redis');
const hookHttp = require('./http');

module.exports = app => {
  const {
    Sequelize,
    redis,
    httpclient,
    config: { jaeger },
  } = app;

  if (httpclient) {
    hookHttp(app);
  }
  if (Sequelize && jaeger.sequelize) {
    hookSequelize(app);
  }
  if (redis && jaeger.redis) {
    hookRedis(app);
  }
};
