import { Response, Request } from "express";
import { addRole, getAllRoles, getRoleById, updateRole, deleteRole} from "./role.service";
import { BadRequestError, DatabaseError } from "../../errors/serviceErrors";

export const getRole = async (_req: Request, res: Response) => {
    try {
        const roles = await getAllRoles();
        return res.json(roles);
    } catch (err: unknown) {
        if (err instanceof DatabaseError) {
            return res.status(err.statusCode).json({ error: 'Database error' });
        }

        const message = err instanceof Error ? err.message : 'Internal server error';
        return res.status(500).json({ error: message });
    }
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

export const getRoleByIdController = async (req: Request, res: Response) => {
    const {id} = req.params;
   try {
        const role = await getRoleById(id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        return res.json(role);
   } catch (error) {
        if (error instanceof DatabaseError) {
            return res.status(error.statusCode).json({ error: 'Database error' });
        }

        const message = error instanceof Error ? error.message : 'Internal server error';
        return res.status(500).json({ error: message });
   }
}


export const updateRoleController = async (req: Request, res: Response) => {
    try {
        const { role } = req.body;
        const { id } = req.params;
        
        const updated = await updateRole({role},id)
        return res.json(updated);
    } catch (error) {
        if (error instanceof BadRequestError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        if (error instanceof DatabaseError) {
            return res.status(error.statusCode).json({ error: 'Database error' });
        }

        const message = error instanceof Error ? error.message : 'Internal server error';
        return res.status(500).json({ error: message });
    }
}

export const deleteRoleController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteRole(id);
        return res.status(204).send();
    } catch (error) {
        if (error instanceof DatabaseError) {
            return res.status(error.statusCode).json({ error: 'Database error' });
        }

        const message = error instanceof Error ? error.message : 'Internal server error';
        return res.status(500).json({ error: message });
    }
}