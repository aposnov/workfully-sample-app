import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');
    const authCookie = req.cookies.access_token;
  
    let token: any;
  
    if (!authHeader && !authCookie) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      token = authCookie;
    }
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET_KEY || 'secret', (err: any, decoded: any) => {
  
      if (err) {
        console.log('Token verification failed:', err);
        return res.status(401).json({ error: 'Invalid token' });
      } 
  
      req.customData = decoded.email;
      next();
    });
  }