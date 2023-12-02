import { Button } from "@mui/base";
import Link from "next/link";
import UserList from "./components/userList";
import jsonToDb from "@/libs/jsonToDb";
import { getUsers } from "./api/users/route";

// const getUsers = async () => {
//   try {
//     const res = await fetch(process.env.hostURL + '/api/users', { cache: "no-store", });
//     if (!res.ok) {
//       throw new Error("Failed to fetch user");
//     }
//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// }

export default async function Home() {

  const users = await getUsers();
  //jsonToDb();

  return (
    <div>
      <Button className='bg-teal-400 px-5 py-2 m-4 rounded text-white'><Link href={"/addUser"}>Add User</Link></Button>
      <UserList userlist={users} />
    </div>
  )
}
