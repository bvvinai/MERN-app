import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className='flex justify-between items-center'>
            <div className='text-teal-400 px-2 py-2 m-4'>MERN APP</div>
            <div>
                <Link className='bg-teal-400 px-5 py-2 m-4 rounded text-white' href={"/"}>Users</Link>
            </div>
        </nav>
    )
}
