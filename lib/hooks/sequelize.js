'use strict';
const { Tags } = require('opentracing');

module.exports = app => {
  const query = app.Sequelize.prototype.query;
  app.Sequelize.prototype.query = async function(sql, options) {
    const spanOptions = {
      tags: {
        [Tags.DB_INSTANCE]: this.config.database,
        [Tags.DB_STATEMENT]: sql,
        [Tags.DB_TYPE]: 'sql',
        [Tags.DB_USER]: this.config.username,
      },
    };
    const span = app.startSpan(`SQL ${options.type}`, spanOptions);
    try {
      const res = await query.apply(this, [ sql, options ]);
      span.finish();
      return res;
    } catch (error) {
      span.setTag(Tags.ERROR, true);
      span.log({
        event: 'ERROR_SQL_QUERY',
        message: error.message,
        stack: error.stack,
      });
      span.finish();
      throw error;
    }
  };
};
