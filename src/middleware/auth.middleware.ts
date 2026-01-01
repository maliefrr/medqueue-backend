import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to authenticate and authorize access to role management endpoints.
 * 
 * This implementation expects a static API key provided via the `x-api-key` header
 * that matches the `ROLE_MANAGEMENT_API_KEY` environment variable.
 * 
 * In a real deployment, you can replace or extend this with your existing
 * authentication/authorization mechanism (e.g., JWT, session-based auth, RBAC).
 */
export const authenticateAndAuthorizeRoleManagement = (req: Request, res: Response, next: NextFunction): void => {
    const apiKeyHeaderName = 'x-api-key';
    const apiKeyFromRequest = req.header(apiKeyHeaderName);
    const expectedApiKey = process.env.ROLE_MANAGEMENT_API_KEY;

    if (!expectedApiKey) {
        // Fail safe: if no expected key is configured, deny access.
        res.status(500).json({
            message: 'Role management API key is not configured on the server.',
        });
        return;
    }

    if (!apiKeyFromRequest || apiKeyFromRequest !== expectedApiKey) {
        res.status(401).json({
            message: 'Unauthorized role management access.',
        });
        return;
    }

    next();
};

/**
 * Middleware to authenticate access to schema endpoint.
 * 
 * This implementation uses basic authentication with credentials from environment variables.
 */
export const authenticateSchemaAccess = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.header('authorization');
    
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        res.set('WWW-Authenticate', 'Basic realm="schema"');
        res.status(401).send('Authentication required');
        return;
    }

    const expectedUser = process.env.SCHEMA_USER;
    const expectedPass = process.env.SCHEMA_PASS;

    if (!expectedUser || !expectedPass) {
        res.status(500).json({
            message: 'Schema authentication is not configured on the server.',
        });
        return;
    }

    const base64Credentials = authHeader.substring(6);
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    if (username !== expectedUser || password !== expectedPass) {
        res.set('WWW-Authenticate', 'Basic realm="schema"');
        res.status(401).send('Authentication required');
        return;
    }

    next();
};
