const Server = require('../server');
const testConfig = require('../../test.config');
const request = require('supertest');

describe.skip('Testing custom operations controller', () => {
  test('test', async () => {
    let config = Object.assign({}, testConfig, { logging: { level: 'emerg' } });
    const server = new Server(config).setProfileRoutes().setErrorRoutes();

    //let keys = Object.keys(server.config.profiles);
    //let { routes } = require('../route.config');

    let response = await request(server.app).get('/4_0_1/Patient/$testOp');
    expect(response.status).toEqual(200);
  });
});
