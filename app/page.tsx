import Link from "next/link";
import AddToChart from "./components/AddToCard";
import ProductCard from "./components/ProductCard";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      {/* <h1>Hello Next.js</h1> */}
      {
        <h1>
          Hello <span>{session && session.user!.name}</span>
        </h1>
      }
      {/* using a normal "a" tag in routing causes all the resources to be fetched again */}
      {/* <a href="/users">users</a> */}
      {/* to fix it use "Link" component defined in next.js */}
      <Link href={"/users"}>users</Link>
      <ProductCard />
    </main>
  );
}
