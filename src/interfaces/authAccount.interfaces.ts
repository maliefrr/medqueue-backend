export interface AuthAccount {
    id: string;
    email: string;
    password: string;
    role_id: string;
    is_active: boolean;
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
}