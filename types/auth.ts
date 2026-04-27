// auth.ts

type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
};

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
    user: User;
};
