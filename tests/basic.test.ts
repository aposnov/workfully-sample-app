import request from 'supertest';
import app from "../src/index";

describe('GET /', () => {

  it('responds with 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

});