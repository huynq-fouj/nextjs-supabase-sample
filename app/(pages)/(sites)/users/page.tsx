import Title from "../_layouts/Title";
import UserList from "./_components/UserList";

export default function UsersPage() {
    return (
        <section className="w-full h-auto">
            <Title>Users management</Title>
            <UserList />
        </section>
    )
}