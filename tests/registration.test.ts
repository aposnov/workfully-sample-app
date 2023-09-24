import request from 'supertest';
import app from "../src/index";
import { User, UserRepoTokens } from "../src/backend/db";

describe('Registration Endpoint', () => {
  // Clear the database before each test
  beforeEach(async () => {
    await User.destroy({ where: {} });
    await UserRepoTokens.destroy({ where: {} });
  });

  it('should register a new user', async () => {
    const newUser = {
      email: 'test@example1.com',
      firstName: 'Andrey',
      lastName: 'Posnov',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/register')
      .send(newUser)
      .expect(200)

    expect(response.body).toHaveProperty('token');

  });

});
