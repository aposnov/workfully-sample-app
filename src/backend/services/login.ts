import { Request, Response } from 'express';
import { generateToken, comparePasswords } from '../helpers/authHelpers';
import { User, UserRepoTokens } from '../controllers/db';

export async function loginService(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
  
        // Validate user input
        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
        }
  
        // Find the user in the database
        const user = await User.findOne({ where: { email } });
  
        if (!user || !(await comparePasswords(password, user.password))) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
  
        // Generate and return JWT token
        const token = generateToken({ email });
  
        // Check repo tokens and add token
        try {
          await UserRepoTokens.update({ token: token }, {
            where: {
              email: email,
            },
          });
  
          // Log in success
          res.cookie('access_token', token, {
            httpOnly: true
          }).status(200).json({ message: 'Login successful' });
  
        } catch (error) {
          res.status(500).json({ error: 'Internal server error db' });
        }
  
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }

}