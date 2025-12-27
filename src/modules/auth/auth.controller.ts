import { Request, Response } from 'express';

export const LoginController = (_req: Request, res: Response) => {
    res.json({message: 'Login Endpoint'})
}

export const RegisterController = (_req: Request, res: Response) => {
    res.json({message: 'Register Endpoint'})
}