import { Response, Request } from "express";
import { addRole, getAllRoles, getRoleById, updateRole, deleteRole} from "./role.service";
import { BadRequestError, DatabaseError, NotFoundError } from "../../errors/serviceErrors";

// Validation helper for role name
const validateRoleName = (role: string): void => {
    if (!role) {
        throw new BadRequestError('Role is required');
    }
    if (typeof role !== 'string') {
        throw new BadRequestError('Role must be a string');
    }
    if (role.length < 1 || role.length > 50) {
        throw new BadRequestError('Role name must be between 1 and 50 characters');
    }
    if (!/^[a-zA-Z0-9_]+$/.test(role)) {
        throw new BadRequestError('Role name can only contain letters, numbers, and underscores');
    }
};

// Validation helper for UUID
const validateUUID = (id: string): void => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
        throw new BadRequestError('Invalid ID format. Must be a valid UUID');
    }
};

export const getRole = async (_req: Request, res: Response) => {
    try {
        const roles = await getAllRoles();
        return res.json(roles);
    } catch (err: unknown) {
        if (err instanceof DatabaseError) {
            return res.status(err.statusCode).json({ error: err.message });
        }

        const message = err instanceof Error ? err.message : 'Internal server error';
        return res.status(500).json({ error: message });
    }
}


export const createRole = async (req: Request, res: Response) => {
    try {
        const { role } = req.body;
        validateRoleName(role);

        const created = await addRole({ role });
        return res.status(201).json(created);
    } catch (err: unknown) {
        if (err instanceof BadRequestError) {
            return res.status(err.statusCode).json({ error: err.message });
        }

        if (err instanceof DatabaseError) {
            return res.status(err.statusCode).json({ error: err.message });
        }

        const message = err instanceof Error ? err.message : 'Internal server error';
        return res.status(500).json({ error: message });
    }
}

export const getRoleByIdController = async (req: Request, res: Response) => {
    const {id} = req.params;
   try {
        validateUUID(id);
        const role = await getRoleById(id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        return res.json(role);
   } catch (error) {
        if (error instanceof BadRequestError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        if (error instanceof DatabaseError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        const message = error instanceof Error ? error.message : 'Internal server error';
        return res.status(500).json({ error: message });
   }
}


export const updateRoleController = async (req: Request, res: Response) => {
    try {
        const { role } = req.body;
        const { id } = req.params;
        
        validateUUID(id);
        validateRoleName(role);
        
        const updated = await updateRole({role},id)
        return res.json(updated);
    } catch (error) {
        if (error instanceof BadRequestError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        if (error instanceof NotFoundError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        if (error instanceof DatabaseError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        const message = error instanceof Error ? error.message : 'Internal server error';
        return res.status(500).json({ error: message });
    }
}

export const deleteRoleController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        validateUUID(id);
        await deleteRole(id);
        return res.status(204).send();
    } catch (error) {
        if (error instanceof BadRequestError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        if (error instanceof NotFoundError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        if (error instanceof DatabaseError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        const message = error instanceof Error ? error.message : 'Internal server error';
        return res.status(500).json({ error: message });
    }
}