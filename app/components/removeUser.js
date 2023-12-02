"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function RemoveUser({ id, getud }) {
    const router = useRouter();
    const removeUser = async () => {
        const confirmed = confirm("Are you sure?");
        if (confirmed) {
            const res = await fetch(`/api/users/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                getud();
            }
        }
    };

    return (
        <Button onClick={removeUser}><HiOutlineTrash size={26} /></Button>
    );
}