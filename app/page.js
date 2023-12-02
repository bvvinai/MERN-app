import { Button } from "@mui/base";
import Link from "next/link";
import UserList from "./components/userList";
import jsonToDb from "@/libs/jsonToDb";
import { getUsers } from "./api/users/route";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

export default dynamic(() => Promise.resolve(Home), {
  ssr: false
})

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

async function Home() {
  //jsonToDb();
  const users = await getData()
  return (
    <div>
      <Button className='bg-teal-400 px-5 py-2 m-4 rounded text-white'><Link href={"/addUser"}>Add User</Link></Button>
      <UserList userlist={users} />
    </div>
  )
}

async function getData() {
  const res = await getUsers();
  return res;
}
