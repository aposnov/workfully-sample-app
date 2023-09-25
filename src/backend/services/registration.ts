import { Request, Response } from 'express';
import { hashPassword, generateToken } from '../helpers/authHelpers';
import { User, UserRepoTokens } from '../controllers/db';

function isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

export async function registrationService(req: Request, res: Response) {

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

        res.json({ message: 'Registration successful', token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}