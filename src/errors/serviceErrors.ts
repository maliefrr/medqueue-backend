export class ServiceError extends Error {
    public statusCode: number;
    constructor(message?: string, statusCode = 500) {
        super(message);
        this.name = 'ServiceError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class BadRequestError extends ServiceError {
    constructor(message = 'Bad request') {
        super(message, 400);
        this.name = 'BadRequestError';
    }
}

export class DatabaseError extends ServiceError {
    constructor(message = 'Database error') {
        super(message, 500);
        this.name = 'DatabaseError';
    }
}

export default ServiceError;
