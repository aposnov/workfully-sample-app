import { Express, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import { registrationService } from '../services/registration';
import { loginService } from '../services/login';
import { profileService } from '../services/profile';
import { logoutService } from '../services/logout';

export function configureApiRoutes(app: Express) {

  // API

  // Registration endpoint
  app.post('/api/register', async (req: Request, res: Response) => {
    registrationService(req, res)
  });

  // Login endpoint
  app.post('/api/login', async (req: Request, res: Response) => {
    loginService(req, res)
  });

  // Protected Profile Endpoint
  app.get('/api/profile', authenticateToken, async (req: Request, res: Response) => {
    profileService(req,res)
  });

  // Logout endpoint
  app.post('/api/logout', authenticateToken, async (req: Request, res: Response) => {
    logoutService(req,res)
  });

}