import { Request, Response } from 'express';
import { User, UserRepoTokens } from '../controllers/db';

export async function profileService(req: Request, res: Response) {
    try {
        const userEmail = req.customData
  
        if (!userEmail) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
  
        const userToken = await UserRepoTokens.findOne({ where: { email: userEmail } });
  
        if (!userToken) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
  
        // Fetch user data associated with the authenticated user's email from the database
        const user = await User.findOne({ where: { email: userEmail } });
  
        if (!user) {
          return res.status(400).json({ error: 'User not found' });
        }
  
        // Return user data (excluding the password)
        const { email, firstName, lastName } = user;
  
        res.json({ email, firstName, lastName });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}