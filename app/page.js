import { Button } from "@mui/base";
import Link from "next/link";
import UserList from "./components/userList";
import jsonToDb from "@/libs/jsonToDb";
import User from "@/models/user";
import connectMongoDB from "@/libs/mongodb";

const getUsers = async () => {
  try {
    await connectMongoDB();
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {

  const { users } = await getUsers();

  //jsonToDb();

  return (
    <div>
      <Button className='bg-teal-400 px-5 py-2 m-4 rounded text-white'><Link href={"/addUser"}>Add User</Link></Button>
      <UserList userlist={users} />
    </div>
  )
}
