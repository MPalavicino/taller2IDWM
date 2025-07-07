export interface User{
    firstName?: string;
    lastName?: string;
    email: string;
    telephone?: string;
    street?: string;
    number?: string;
    comune?: string;
    region?: string;
    postalCode?: string;
    birthDate?: null;
    registeredAt?: Date;
    lastAccess?: Date;
    isActive?: boolean;
    password?: string;
    confirmPassword?: string;
    token?: string;
    role?: string;
}