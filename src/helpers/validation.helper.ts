import { BadRequestError } from "../errors/serviceErrors";

/**
 * Validation helper for role name
 * Validates that the role name is a string between 1-50 characters
 * and contains only alphanumeric characters and underscores
 */
export const validateRoleName = (role: string): void => {
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

/**
 * Validation helper for UUID format
 * Validates that the ID is in valid UUID format
 */
export const validateUUID = (id: string): void => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
        throw new BadRequestError('Invalid ID format. Must be a valid UUID');
    }
};
