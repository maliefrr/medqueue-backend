import pool from "../../database";

export const checkRoleExists = async (role: string): Promise<boolean> => {
    const result = await pool.query(
        'SELECT 1 FROM medqueue.role WHERE role = $1 AND deleted_at IS NULL',
        [role]
    )

    
    return result.rowCount! > 0;
}