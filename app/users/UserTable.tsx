// this interface is used only in this component so no need to put it in a separate folder
interface User {
  id: number;
  name: string;
  email: string;
}

const UserTable = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });

  const users: User[] = await data.json();

  return (
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
  );
};
export default UserTable;
