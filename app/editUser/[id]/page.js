import { getUserById } from "@/app/api/users/[id]/route";
import EditUserForm from "@/app/components/editUserForm";

export default async function EditUser({ params }) {
    const { id } = params;

    const user = await getUserById(id);

    return <EditUserForm user={user} />;
}
