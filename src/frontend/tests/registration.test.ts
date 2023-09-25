// import request from 'supertest';
// import app from "../src/index";
// import { User, UserRepoTokens } from "../src/backend/db";

// describe('Registration Endpoint', () => {

//   // Clear the database before each test
//   beforeEach(async () => {
//     await User.destroy({ where: {} });
//     await UserRepoTokens.destroy({ where: {} });
//   });

//   it('should register a new user', async () => {
    
//     const newUser = {
//       email: 'test@example1.com',
//       firstName: 'Andrey',
//       lastName: 'Posnov',
//       password: 'password123',
//     };

//     const response = await request(app)
//       .post('/api/register')
//       .send(newUser)
//       .expect(200)

//     expect(response.body).toHaveProperty('token');

//   });

//   it('should return an error if a required field is missing', async () => {
//     const incompleteUser = {
//       email: 'test@example.com',
//       firstName: 'John',
//       // Missing 'lastName' and 'password'
//     };

//     const response = await request(app)
//       .post('/api/register')
//       .send(incompleteUser)
//       .expect(400);

//     // Assert the error response, e.g., checking for 'error' property
//     expect(response.body).toHaveProperty('error', 'All fields are required');
//   });

//   it('should return an error if the user already exists', async () => {
//     const existingUser = {
//       email: 'test@example.com',
//       firstName: 'John',
//       lastName: 'Doe',
//       password: 'password123',
//     };

//     await User.create(existingUser);

//     const response = await request(app)
//       .post('/api/register')
//       .send(existingUser)
//       .expect(400);

//     // Assert the error response, e.g., checking for 'error' property
//     expect(response.body).toHaveProperty(
//       'error',
//       'User with this email already exists'
//     );
//   });

// });
