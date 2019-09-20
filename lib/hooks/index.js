'use strict';
const hookSequelize = require('./sequelize');
const hookRedis = require('./redis');
const hookHttp = require('./http');

module.exports = app => {
  const {
    Sequelize,
    redis,
    curl,
    config: { jaeger },
  } = app;

  if (curl) {
    hookHttp(app);
  }
  if (Sequelize && jaeger.sequelize) {
    hookSequelize(app);
  }
  if (redis && jaeger.redis) {
    hookRedis(app);
  }
};
