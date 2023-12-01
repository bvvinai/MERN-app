import EditUserForm from "@/app/components/editUserForm";

const getUserById = async (id) => {
    try {
        const res = await fetch(process.env.hostURL + `/api/users/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch user");
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export default async function EditUser({ params }) {
    const { id } = params;
    const { user } = await getUserById(id);

    return <EditUserForm user={user} />;
}
