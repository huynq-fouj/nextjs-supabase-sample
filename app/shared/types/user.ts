export type User = {
    id: string;
    fullname: string;
    username: string;
    dob: string | null;
    email: string | null;
    address: string | null;
    avatar: string | null;
    roles: string[]
};