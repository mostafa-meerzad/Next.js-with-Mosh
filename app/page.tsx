import Link from "next/link";
import AddToChart from "./components/AddToCard";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <main>
      <h1>Hello Next.js</h1>
      {/* using a normal "a" tag in routing causes all the resources to be fetched again */}
      {/* <a href="/users">users</a> */}
      {/* to fix it use "Link" component defined in next.js */}
      <Link href={"/users"}>users</Link>
      <ProductCard/>
    </main>
  )
}
