"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

const NewUserPage = () => {
    const router = useRouter() // userRouter hook is provided to navigate between pages programmatically
    // make sure useRouter is coming from "navigation" the new "app router" not from the "router" which is the old "router" 
    // router.push > navigates to the provide route
    // router.back > navigates to the previous route just like back button
    // router.forward > navigates to the previous route just like next button
    // router.refresh > refreshes the page
  return (
    <div>
      {/* this is navigation using the Link component */}
      {/* <Link href={"/users"}> users page</Link>  */}
        <button className="btn" onClick={() => router.push("/users")}>users page</button>
    </div>
  );
};
export default NewUserPage;
