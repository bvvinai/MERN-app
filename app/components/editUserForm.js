"use client";
import { Button } from "@mui/base";
import Link from "next/link";
import { Input, Radio, InputLabel } from '@mui/material';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditUserForm({ user }) {

    const [first_name, setFname] = useState(user.first_name);
    const [last_name, setLname] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [gender, setGender] = useState(user.gender);
    const [avatar, setAvatar] = useState(user.avatar);
    const [domain, setDomain] = useState(user.domain);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(process.env.hostURL + `/api/users/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ first_name, last_name, email, gender, avatar, domain }),
            });
            if (res.ok) {
                router.refresh();
                router.push('/');
            }
            else {
                throw new Error("User Update Failed");
            }
        } catch (error) { console.log(error); }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-full mt-10 h-full flex flex-col justify-center items-center">
            <Input value={first_name} onChange={(e) => setFname(e.target.value)} type="text" className="w-2/3 m-5" placeholder="First Name" />
            <Input value={last_name} onChange={(e) => setLname(e.target.value)} type="text" className="w-2/3 m-5" placeholder="Last Name" />
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="w-2/3 m-5" placeholder="Email" />
            <div className="w-2/3 m-5 flex flex-wrap items-center">
                <InputLabel>Gender : </InputLabel>
                <Radio checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} value="Male" />
                <InputLabel>Male</InputLabel>
                <Radio checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} value="Female" />
                <InputLabel>Female</InputLabel>
                <Radio checked={gender === "Non-binary"} onChange={(e) => setGender(e.target.value)} value="Non-binary" />
                <InputLabel>Non-binary</InputLabel>
                <Radio checked={gender === "Agender"} onChange={(e) => setGender(e.target.value)} value="Agender" />
                <InputLabel>Agender</InputLabel>
                <Radio checked={gender === "Bigender"} onChange={(e) => setGender(e.target.value)} value="Bigender" />
                <InputLabel>Bigender</InputLabel>
                <Radio checked={gender === "Polygender"} onChange={(e) => setGender(e.target.value)} value="Polygender" />
                <InputLabel>Polygender</InputLabel>
                <Radio checked={gender === "Genderfluid"} onChange={(e) => setGender(e.target.value)} value="Genderfluid" />
                <InputLabel>Genderfluid</InputLabel>
                <Radio checked={gender === "Genderqueer"} onChange={(e) => setGender(e.target.value)} value="Genderqueer" />
                <InputLabel>Genderqueer</InputLabel>
            </div>
            <Input value={avatar} onChange={(e) => setAvatar(e.target.value)} type="text" className="w-2/3 m-5" placeholder="Avatar URL" />
            <div className="w-2/3 m-5 flex flex-wrap items-center">
                <InputLabel>Domain : </InputLabel>
                <Radio checked={domain === "Sales"} onChange={(e) => setDomain(e.target.value)} value="Sales" />
                <InputLabel>Sales</InputLabel>
                <Radio checked={domain === "Finance"} onChange={(e) => setDomain(e.target.value)} value="Finance" />
                <InputLabel>Finance</InputLabel>
                <Radio checked={domain === "Marketing"} onChange={(e) => setDomain(e.target.value)} value="Marketing" />
                <InputLabel>Marketing</InputLabel>
                <Radio checked={domain === "IT"} onChange={(e) => setDomain(e.target.value)} value="IT" />
                <InputLabel>IT</InputLabel>
                <Radio checked={domain === "Management"} onChange={(e) => setDomain(e.target.value)} value="Management" />
                <InputLabel>Management</InputLabel>
                <Radio checked={domain === "UI Designing"} onChange={(e) => setDomain(e.target.value)} value="UI Designing" />
                <InputLabel>UI Designing</InputLabel>
                <Radio checked={domain === "Business Development"} onChange={(e) => setDomain(e.target.value)} value="Business Development" />
                <InputLabel>Business Development</InputLabel>
            </div>
            <button type="submit" className='bg-teal-400 w-1/2 px-5 py-2 m-4 rounded text-white'>
                Update User
            </button>
        </form>
    )
}
