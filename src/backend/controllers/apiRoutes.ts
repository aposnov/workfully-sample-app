import { Express, Request, Response } from 'express';
import { hashPassword, authenticateToken, comparePasswords, generateToken } from './auth';
import { User, UserRepoTokens } from './db';

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function configureApiRoutes(app: Express) {

  // API

  // Registration endpoint
  app.post('/api/register', async (req: Request, res: Response) => {
    try {
      const { email, firstName, lastName, password } = req.body;

      // Validate user input
      if (!email || email.trim() === '' ||
         !firstName || firstName.trim() === '' ||
         !lastName || lastName.trim() === '' ||
          !password || password.trim() === '') {
        return res.status(400).json({ error: 'All fields are required' });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Looks like email field is incorrect' });
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      // Hash the password
      const hashedPassword = await hashPassword(password);

      // Create a new user in the database
      await User.create({ email, firstName, lastName, password: hashedPassword });

      // Generate and return JWT token
      const token = generateToken({ email });

      // Add token to User Repo Tokens to manage it later
      await UserRepoTokens.create({ token, email });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Login endpoint
  app.post('/api/login', async (req: Request, res: Response) => {
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
        }).status(200).json({ token: token });

      } catch (error) {
        res.status(500).json({ error: 'Internal server error db' });
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Protected Profile Endpoint
  app.get('/api/profile', authenticateToken, async (req: Request, res: Response) => {
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
  });


  // Logout endpoint
  app.post('/api/logout', authenticateToken, async (req: Request, res: Response) => {
  
    try {

      const userEmail = req.customData

      if (!userEmail) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      try {
        const user = await User.findOne({ where: { email: userEmail } });
        if (!user) {
          return res.status(400).json({ error: 'User not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal server error db' });
      }

      // Check repo tokens and remove token
      try {
        await UserRepoTokens.update({ token: '' }, {
          where: {
            email: userEmail,
          },
        });

        res.cookie('access_token', '', {
          httpOnly: true
        }).status(200).json({ message: 'Logged out successfully1' });

      } catch (error) {
        res.status(500).json({ error: 'Internal server error db' });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

}