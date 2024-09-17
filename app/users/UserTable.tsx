import { sort } from "fast-sort";
import Link from "next/link";

// this interface is used only in this component so no need to put it in a separate folder
interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  order: string;
}
const UserTable = async ({ order }: Props) => {
  const data = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });

  const users: User[] = await data.json();
  const usersSorted = sort(users).asc(
    order === "email" ? (user) => user.email : (user) => user.name
  );
  return (
    <table className="table table-sm table-zebra">
      <thead>
        <tr>
          <th>
            <Link href={"/users?sortOrder=name"}>Name</Link>
          </th>
          <th>
            <Link href={"/users?sortOrder=email"}>Email</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {usersSorted.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default UserTable;
