'use strict';

const { Tags } = require('opentracing');

module.exports = app => {
  const sendCommand = app.redis.sendCommand;
  app.redis.sendCommand = async function(command) {
    const spanOptions = {
      tags: {
        [Tags.DB_INSTANCE]: this.options.db,
        [Tags.DB_STATEMENT]: command.name + ' ' + command.args.join(' '),
        [Tags.DB_TYPE]: 'redis',
      },
    };
    const span = app.startSpan(`REDIS ${command.name}`, spanOptions);
    try {
      const res = await sendCommand.apply(this, [ command ]);
      span.finish();
      return res;
    } catch (error) {
      span.setTag(Tags.ERROR, true);
      span.log({
        event: 'ERROR_REDIS_COMMAND',
        message: error.message,
        stack: error.stack,
      });
      span.finish();
      throw error;
    }
  };
};
