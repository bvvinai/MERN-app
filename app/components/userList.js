"use client";
import { Button, Card, CardActions, CardContent, Checkbox, Input, InputLabel, Pagination, Radio, TablePagination, Typography, darkScrollbar, duration } from "@mui/material";
import Link from "next/link";
import { HiEye, HiOutlineEye, HiOutlineTrash, HiPencilAlt } from "react-icons/hi";
import RemoveUser from "./removeUser";
import { useEffect, useState } from "react";

export default function UserList() {

    //const userlist = await getUsers();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [userlist, setUserList] = useState([]);
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [gender, setGenderList] = useState([]);
    const [available, setAvailable] = useState(null);
    const [domain, setDomainList] = useState([]);

    const clearState = () => {
        setName("");
        setGenderList([]);
        setDomainList([]);
        setAvailable(null);
    }

    useEffect(() => {
        fetch('/api/users')
            .then((res) => res.json())
            .then((data) => {
                setUserList(data.users)
                setUsers(data.users)
            })
    }, []);

    useEffect(() => {
        setUsers(
            userlist.filter((user) => {
                return (user.first_name.match(name) || user.last_name.match(name)) && (available == null ? true : user.available.toString() == available) && (gender.length == 0 ? true : gender.includes(user.gender)) && (domain.length == 0 ? true : domain.includes(user.domain));
            })
        );
    }, [name, gender, domain, available]);

    const setGender = (e) => {
        if (e.target.checked) {
            setGenderList([...gender, e.target.value]);
        }
        else {
            setGenderList(gender.filter(g => g !== e.target.value));
        }
    }

    const setDomain = (e) => {
        if (e.target.checked) {
            setDomainList([...domain, e.target.value]);
        }
        else {
            setDomainList(domain.filter(d => d !== e.target.value));
        }
    }

    const changePage = (e, v) => {
        setPage(v);
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }

    return (
        <div className="flex w-full flex-col items-center">
            <div className="mb-10 p-5 w-full flex flex-col items-center">
                <Input onChange={(e) => setName(e.target.value)} value={name} type="text" className="w-2/3 mb-5" placeholder="Search for First name / Last Name" />
                <div className="w-2/3 m-2 flex flex-wrap items-center">
                    <InputLabel>Gender : </InputLabel>
                    <div className="flex items-center"><Checkbox checked={gender.includes("Male")} onChange={(e) => setGender(e)} value="Male" />
                        <InputLabel>Male</InputLabel></div>
                    <div className="flex items-center"><Checkbox checked={gender.includes("Female")} onChange={(e) => setGender(e)} value="Female" />
                        <InputLabel>Female</InputLabel></div>
                    <div className="flex items-center"><Checkbox checked={gender.includes("Non-binary")} onChange={(e) => setGender(e)} value="Non-binary" />
                        <InputLabel>Non-Binary</InputLabel></div>
                    <div className="flex items-center"><Checkbox checked={gender.includes("Agender")} onChange={(e) => setGender(e)} value="Agender" />
                        <InputLabel>Agender</InputLabel></div>
                    <div className="flex items-center"><Checkbox checked={gender.includes("Bigender")} onChange={(e) => setGender(e)} value="Bigender" />
                        <InputLabel>Bigender</InputLabel></div>
                    <div className="flex items-center"><Checkbox checked={gender.includes("Polygender")} onChange={(e) => setGender(e)} value="Polygender" />
                        <InputLabel>Polygender</InputLabel></div>
                    <div className="flex items-center"><Checkbox checked={gender.includes("Genderfluid")} onChange={(e) => setGender(e)} value="Genderfluid" />
                        <InputLabel>Genderfluid</InputLabel></div>
                    <div className="flex items-center"><Checkbox checked={gender.includes("Genderqueer")} onChange={(e) => setGender(e)} value="Genderqueer" />
                        <InputLabel>Genderqueer</InputLabel></div>
                </div>
                <div className="w-2/3 m-2 flex flex-wrap items-center">
                    <InputLabel>Domain : </InputLabel>
                    <div className="flex items-center"><Checkbox checked={domain.includes("Sales")} onChange={(e) => setDomain(e)} value="Sales" />
                        <InputLabel>Sales</InputLabel></div>
                    <div className="flex items-center"><Checkbox checked={domain.includes("Finance")} onChange={(e) => setDomain(e)} value="Finance" />
                        <InputLabel>Finance</InputLabel></div>
                    <div className="flex items-center"><Checkbox checked={domain.includes("Marketing")} onChange={(e) => setDomain(e)} value="Marketing" />
                        <InputLabel>Marketing</InputLabel></div>
                    <div className="flex items-center"><Checkbox checked={domain.includes("IT")} onChange={(e) => setDomain(e)} value="IT" />
                        <InputLabel>IT</InputLabel></div>
                    <div className="flex items-center"><Checkbox checked={domain.includes("Management")} onChange={(e) => setDomain(e)} value="Management" />
                        <InputLabel>Management</InputLabel></div>
                    <div className="flex items-center"><Checkbox checked={domain.includes("UI Designing")} onChange={(e) => setDomain(e)} value="UI Designing" />
                        <InputLabel>UI Designing</InputLabel></div>
                    <div className="flex items-center"><Checkbox checked={domain.includes("Business Development")} onChange={(e) => setDomain(e)} value="Business Development" />
                        <InputLabel>Business Development</InputLabel></div>
                </div>
                <div className="w-2/3 m-2 flex flex-wrap items-center">
                    <InputLabel>Availability : </InputLabel>
                    <Radio checked={available == 'true'} onChange={(e) => setAvailable(e.target.value)} value={true} />
                    <InputLabel>Available</InputLabel>
                    <Radio checked={available == 'false'} onChange={(e) => setAvailable(e.target.value)} value={false} />
                    <InputLabel>Not Available</InputLabel>
                </div>
                <button onClick={clearState} className='bg-teal-400 px-5 py-2 m-4 rounded text-white'>Clear Filters</button>
            </div>

            <TablePagination component={'div'} rowsPerPageOptions={[10, 20, 50, 100]} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage} className="my-5" count={users.length} page={page} onPageChange={changePage} />

            <div className="flex flex-col-reverse w-full">
                {users.slice((page) * rowsPerPage, Math.min(users.length, ((page + 1) * rowsPerPage))).map((u) => (
                    <Card key={u._id} sx={{ display: 'flex', margin: '10px' }}>
                        <CardContent className="mr-auto">
                            <Typography variant="h5" component="div">
                                {u.first_name} {u.last_name}
                            </Typography>
                            <Typography variant="body2" component="div">
                                {u.gender}
                            </Typography>
                            <Typography variant="body2" component="div">
                                {u.email}
                            </Typography>
                            <Typography variant="body2" component="div">
                                {u.domain}
                            </Typography>
                            <Typography variant="body2">
                                {u.available ? "Avaiable" : "Not Available"}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button><Link href={`/editUser/${u._id}`}><HiPencilAlt size={26} /></Link></Button>
                            <RemoveUser id={u._id} />
                        </CardActions>
                    </Card >
                ))
                }
            </div>
            <TablePagination component={'div'} rowsPerPageOptions={[10, 20, 50, 100]} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage} className="my-5" count={users.length} page={page} onPageChange={changePage} />
        </div>
    );
}


