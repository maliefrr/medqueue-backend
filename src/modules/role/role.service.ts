import { Role } from "../../interfaces/role.interfaces";
import pool from "../../database";
import { BadRequestError, DatabaseError } from "../../errors/serviceErrors";

type NewRole = {
    role: string;
};

export const addRole = async (input: NewRole): Promise<Role> => {
    if (!input.role) throw new BadRequestError('Invalid role data');

    const result = await pool.query(
        'INSERT INTO medqueue.role (role) VALUES ($1) RETURNING *',
        [input.role]
    );

    if (!result || result.rowCount === 0) throw new DatabaseError('Failed to insert role');

    return result.rows[0] as Role;
};