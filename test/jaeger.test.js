'use strict';

const mock = require('egg-mock');

describe('test/jaeger.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/jaeger-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, jaeger')
      .expect(200);
  });
});
