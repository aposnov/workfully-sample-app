import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function hashPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error('Password hashing failed');
  }
}

export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export function generateToken(data: any): string {
  // Token generation
  const token = jwt.sign(data, 'bcnWorkfully31337', { expiresIn: process.env.ACCESS_TOKEN_EXPIRE || '5m' });

  // Encode the token as base64
  const base64Token = Buffer.from(token).toString('base64');

  return token;
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'bcnWorkfully31337', (err: any, decoded: any) => {

    console.log(err);
    
    if (err) {
      console.log('Token verification failed:', err);
      return res.status(401).json({ error: 'Invalid token' });
    } 

    req.customData = decoded.email;
    next();
  });
}