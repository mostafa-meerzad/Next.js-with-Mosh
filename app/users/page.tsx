const page = async () => {
  interface User {
    id: number;
    name: string;
    email: string;
  }
  // here is how to call an API in next.js server component
  // API calls must be handled in server-components

  // caching
  // caching is built in to Next js so if the user accesses the same url Next is gonna get data from cache and show it

  // cache:"no-store" = disable the caching mechanism
  // next: {revalidate: 10} = revalidate data every 10 seconds
  const data = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });

  // const data = await fetch("https://jsonplaceholder.typicode.com/users");

  // when having caching going on in a page that page is considered static and is rendered in build time and then provided as static page

  // disabling cache in a page makes it dynamic it is rendered at request time
  const users: User[] = await data.json();

  return (
    <div>
      <h1>Users</h1>
      <br />
      <table className="table table-sm table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      users page
    </div>
  );
};
export default page;
