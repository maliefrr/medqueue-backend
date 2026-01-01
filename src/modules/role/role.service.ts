import { Role } from "../../interfaces/role.interfaces";
import pool from "../../database";
import { BadRequestError, DatabaseError, NotFoundError } from "../../errors/serviceErrors";
import { checkRoleExists } from "./role.middleware";

type NewRole = {
    role: string;
};



export const addRole = async (input: NewRole): Promise<Role> => {
    if (!input.role) throw new BadRequestError('Invalid role data');

    // Rely on database unique constraint instead of checking first
    // to avoid race conditions
    try {
        const result = await pool.query(
            'INSERT INTO medqueue.role (role) VALUES ($1) RETURNING *',
            [input.role]
        );

        if (result.rowCount === 0) throw new DatabaseError('Failed to insert role');

        return result.rows[0] as Role;
    } catch (err: any) {
        // Check if it's a unique constraint violation
        if (err.code === '23505') {
            throw new BadRequestError('Role already exists');
        }
        throw err;
    }
};

export const getAllRoles = async (): Promise<Role[]> => {
    const result = await pool.query('SELECT * FROM medqueue.role WHERE deleted_at IS NULL')

    return result.rows as Role[];
}

export const getRoleById = async (id: string): Promise<Role | null> => {
    const result = await pool.query(
        'SELECT * FROM medqueue.role WHERE id = $1 AND deleted_at IS NULL',
        [id]
    )

    if (result.rowCount === 0) return null;

    return result.rows[0] as Role;
}

export const updateRole = async (input: NewRole, id: string) => {
    if (!input.role) throw new BadRequestError('Invalid role data');
    if (!id) throw new BadRequestError('Role ID is required');

    // Check if role exists first
    const existingRole = await getRoleById(id);
    if (!existingRole) {
        throw new NotFoundError('Role not found');
    }

    // Only check for duplicate role name if it's actually changing
    if (existingRole.role !== input.role && await checkRoleExists(input.role)) {
        throw new BadRequestError('Role already exists');
    }

    const result = await pool.query(
        'UPDATE medqueue.role SET role = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
        [input.role, id]
    );
    
    if (result.rowCount === 0) throw new DatabaseError('Failed to update role');
    return result.rows[0] as Role;
}

export const deleteRole = async (id: string): Promise<void> => {
    if (!id) throw new BadRequestError('Role ID is required');

    const result = await pool.query(
        'UPDATE medqueue.role SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL',
        [id]
    );
    
    if (result.rowCount === 0) {
        throw new NotFoundError('Role not found');
    }
}