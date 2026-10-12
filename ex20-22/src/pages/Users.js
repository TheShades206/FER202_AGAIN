import { Link, useParams } from 'react-router-dom';
import { users } from '../data/users';

export function UserDetails({ userId }) {
  const user = users.find((item) => String(item.id) === userId);

  if (!user) {
    return (
      <section>
        <h1>User not found</h1>
        <p>No user has ID {userId}.</p>
        <Link to="/users">Back to users</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>{user.firstName} {user.lastName} : {user.age}</h1>
      <dl className="resource-details">
        <dt>ID</dt><dd>{user.id}</dd>
        <dt>First name</dt><dd>{user.firstName}</dd>
        <dt>Last name</dt><dd>{user.lastName}</dd>
        <dt>Age</dt><dd>{user.age}</dd>
      </dl>
      <Link to="/users">Back to users</Link>
    </section>
  );
}

export default function Users() {
  const { userId } = useParams();

  // Exercise 22: /users and /users/2 share one optional-parameter route.
  if (userId !== undefined) {
    return <UserDetails userId={userId} />;
  }

  return (
    <section>
      <h1>Users</h1>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.firstName} {user.lastName}</Link>
            <span className="text-secondary ms-3">ID: {user.id}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
