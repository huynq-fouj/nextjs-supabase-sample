import { MouseEventHandler, ReactNode } from "react"
import { Permission } from "../enums/permission.enum";

type AuthoritiesButtonProps = {
    children: ReactNode;
    authorities: Permission[];
    type?: 'button' | 'submit' | 'reset';
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

export function AuthoritiesButton({
    children,
    authorities = [],
    type = 'button',
    onClick,
    className
}: Readonly<AuthoritiesButtonProps>) {

    if(!authorities.length) return null;

    return (
        <button
            className={className}
            type={type}
            onClick={onClick}>
            { children }
        </button>
    )
}