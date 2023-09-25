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