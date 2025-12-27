import { Response, Request } from "express";



export const getRole = (_req: Request, res: Response) => {
    res.json({message: 'Get Role Endpoint'})
}


export const createRole = (_req: Request, res: Response) => {
    res.json({message: 'Create Role Endpoint'})
}


export const updateRole = (_req: Request, res: Response) => {
    res.json({message: 'Update Role Endpoint'})
}

export const deleteRole = (_req: Request, res: Response) => {
    res.json({message: 'Delete Role Endpoint'})
}