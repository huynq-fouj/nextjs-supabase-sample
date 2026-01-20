import { User } from "./user";

export type AuthenticationRequest = {
    username: string;
    password: string;
};

export type AuthenticationResponse = {
    access_token: string;
    user: User | null;
}