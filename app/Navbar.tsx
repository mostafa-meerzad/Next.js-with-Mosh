"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { status, data: session } = useSession();

  return (
    <nav className="flex gap-2 bg-gray-500 p-3">
      <Link href={"/"}>Home</Link>
      <Link href={"/users"}>Users</Link>
      <Link href={"/admin"}>Admin</Link>
      <Link href={"/products"}>Products</Link>
      {status === "loading" && <div>loading...</div>}
      {status === "unauthenticated" && (
        <Link href={"/api/auth/signin"}>Login</Link>
      )}
      {status === "authenticated" && <div>{session.user!.name}</div>}
    </nav>
  );
};
export default Navbar;
