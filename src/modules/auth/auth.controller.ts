import { Request, Response } from 'express';

export const LoginController = (_req: Request, res: Response) => {
    res.json({message: 'Login Endpoint'})
}

export const RegisterController = (_req: Request, res: Response) => {
    res.json({message: 'Register Endpoint'})
}

export const RegisterAdminController = (_req: Request, res: Response) => {
    res.json({message: 'Admin Register Endpoint'})
}