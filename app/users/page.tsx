import UserTable from "./UserTable";

const page = async () => {
  // here is how to call an API in next.js server component
  // API calls must be handled in server-components

  // caching
  // caching is built in to Next js so if the user accesses the same url Next is gonna get data from cache and show it

  // cache:"no-store" = disable the caching mechanism
  // next: {revalidate: 10} = revalidate data every 10 seconds

  // const data = await fetch("https://jsonplaceholder.typicode.com/users");

  // when having caching going on in a page that page is considered static and is rendered in build time and then provided as static page

  // disabling cache in a page makes it dynamic it is rendered at request time

  return (
    <div>
      <h1>Users</h1>
      <br />
      <UserTable />
      {/* UserTable is moved to a separate component and it is only used in this page so it make sense to put it next to this page component not into the components folder */}
      <br />
      users page
    </div>
  );
};
export default page;
