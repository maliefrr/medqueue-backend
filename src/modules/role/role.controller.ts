import { Response, Request } from "express";
import { addRole} from "./role.service";
import { BadRequestError, DatabaseError } from "../../errors/serviceErrors";

export const getRole = (_req: Request, res: Response) => {
    res.json({message: 'Get Role Endpoint'})
}


export const createRole = async (req: Request, res: Response) => {
    try {
        const { role } = req.body;
        if (!role) throw new BadRequestError('Role is required');

        const created = await addRole({ role });
        return res.status(201).json(created);
    } catch (err: unknown) {
        if (err instanceof BadRequestError) {
            return res.status(err.statusCode).json({ error: err.message });
        }

        if (err instanceof DatabaseError) {
            return res.status(err.statusCode).json({ error: 'Database error' });
        }

        const message = err instanceof Error ? err.message : 'Internal server error';
        return res.status(500).json({ error: message });
    }
}


export const updateRole = (_req: Request, res: Response) => {
    res.json({message: 'Update Role Endpoint'})
}

export const deleteRole = (_req: Request, res: Response) => {
    res.json({message: 'Delete Role Endpoint'})
}