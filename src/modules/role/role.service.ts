import { Role } from "../../interfaces/role.interfaces";
import pool from "../../database";
import { BadRequestError, DatabaseError } from "../../errors/serviceErrors";
import { checkRoleExists } from "./role.middleware";

type NewRole = {
    role: string;
};



export const addRole = async (input: NewRole): Promise<Role> => {
    if (!input.role) throw new BadRequestError('Invalid role data');

    if (await checkRoleExists(input.role)) {
        throw new BadRequestError('Role already exists');
    }

    const result = await pool.query(
        'INSERT INTO medqueue.role (role) VALUES ($1) RETURNING *',
        [input.role]
    );

    if (!result || result.rowCount === 0) throw new DatabaseError('Failed to insert role');

    return result.rows[0] as Role;
};

export const getAllRoles = async (): Promise<Role[]> => {
    const result = await pool.query('SELECT * FROM medqueue.role WHERE deleted_at IS NULL')

    if (!result) throw new DatabaseError('Failed to fetch roles');

    return result.rows as Role[];
}

export const getRoleById = async (id: string): Promise<Role | null> => {
    const result = await pool.query(
        'SELECT * FROM medqueue.role WHERE id = $1 AND deleted_at IS NULL',
        [id]
    )
    if (!result) throw new DatabaseError('Failed to fetch role by ID');

    if (result.rowCount === 0) return null;

    return result.rows[0] as Role;
}

export const updateRole = async (input: NewRole, id: string) => {
    if (!input.role) throw new BadRequestError('Invalid role data');
    if (!id) throw new BadRequestError('Role ID is required');

    if (await checkRoleExists(input.role)) {
        throw new BadRequestError('Role already exists');
    }

    const result = await pool.query(
        'UPDATE medqueue.role SET role = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
        [input.role, id]
    );
    
    if (!result || result.rowCount === 0) throw new DatabaseError('Failed to update role');
    return result.rows[0] as Role;
}

export const deleteRole = async (id: string): Promise<void> => {
    const result = await pool.query(
        'UPDATE medqueue.role SET deleted_at = NOW() WHERE id = $1',
        [id]
    );
    
    if (!result || result.rowCount === 0) throw new DatabaseError('Failed to delete role');
}