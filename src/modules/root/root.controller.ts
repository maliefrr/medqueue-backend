import { Response, Request } from "express";
import { getSchemaAndTables } from "./root.service";
import { DatabaseError } from "../../errors/serviceErrors";

export const getSchema = async (_req: Request, res: Response) => {
    try {
        const data = await getSchemaAndTables();
        return res.json(data);
    } catch (err: unknown) {
        if (err instanceof DatabaseError) {
            return res.status(err.statusCode).json({ error: 'Database error' });
        }

        const message = err instanceof Error ? err.message : 'Internal server error';
        return res.status(500).json({ error: message });
    }
}