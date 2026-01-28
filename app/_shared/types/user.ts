import { Permission } from "../enums/permission.enum";
import { RegisterRequest } from "./register";

export type User = {
    id: string;
    fullname: string;
    username: string;
    dob: string | null;
    email: string | null;
    address: string | null;
    avatar: string | null;
    roles: Permission[]
};

export type CreateUserRequest = RegisterRequest & Omit<User, 'id'>;