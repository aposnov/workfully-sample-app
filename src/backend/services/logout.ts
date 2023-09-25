import { Request, Response } from 'express';
import { User, UserRepoTokens } from '../controllers/db';

export async function logoutService(req: Request, res: Response) {
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
            }).status(200).json({ message: 'Logged out successfuly' });

        } catch (error) {
            res.status(500).json({ error: 'Internal server error db' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}