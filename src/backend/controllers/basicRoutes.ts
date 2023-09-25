import { Express, Request, Response, NextFunction } from 'express';


export function configureBasicRoutes(app: Express) {

    // BASIC

    // NOT FOUND 404 endpoint
    app.use((req: Request, res: Response) => {
        res.status(404).json({ error: 'Not Found' });
    });

    // Frontend app 
    app.get("/", (req: Request, res: Response, next: NextFunction): void => {
        try {
            res.send("index.html");
        } catch (error) {
            next(error);
        }
    });

}