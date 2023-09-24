import request from 'supertest';
import app from "../src/index";
import { User, UserRepoTokens } from '../src/backend/db';

describe('GET /api/profile', () => {
    
    it('should return 401 Unauthorized when not authenticated', async () => {

        // Make a request to the route
        const response = await request(app).get('/api/profile');

        // Assert the response
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Unauthorized' });
    });

});