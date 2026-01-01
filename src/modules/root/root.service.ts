import pool from "../../database";
import { DatabaseError } from "../../errors/serviceErrors";

export const getSchemaAndTables = async (): Promise<Record<string, string[]>> => {
    const result = await pool.query(
        `SELECT table_schema, table_name
         FROM information_schema.tables
         WHERE table_type = 'BASE TABLE'
           AND table_schema NOT IN ('pg_catalog','information_schema')
         ORDER BY table_schema, table_name`
    );

    if (!result) throw new DatabaseError('Failed to fetch schema information');

    const grouped: Record<string, string[]> = {};
    for (const row of result.rows) {
        const schema = row.table_schema as string;
        const table = row.table_name as string;
        if (!grouped[schema]) grouped[schema] = [];
        grouped[schema].push(table);
    }

    return grouped;
};