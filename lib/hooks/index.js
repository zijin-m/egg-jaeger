'use strict';
const hookSequelize = require('./sequelize');
const hookRedis = require('./redis');
const hookHttp = require('./http');

module.exports = app => {
  const { Sequelize, redis, curl } = app;
  if (Sequelize) {
    hookSequelize(app);
  }
  if (redis) {
    hookRedis(app);
  }
  if (curl) {
    hookHttp(app);
  }
};
