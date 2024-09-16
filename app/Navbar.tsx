import Link from "next/link"

const Navbar = () => {
  return (
    <nav className='flex gap-2 bg-gray-500 p-3'>
    <Link href={"/"}>Home</Link>
    <Link href={"/users"}>Users</Link>
    <Link href={"/admin"}>Admin</Link>
    <Link href={"/products"}>Products</Link>
  </nav>
)
}
export default Navbar