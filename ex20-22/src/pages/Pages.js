import { Link, useParams } from 'react-router-dom';
import DishList from './DishList';
import { UserDetails } from './Users';

export function Home() {
  return <DishList title="Home Component" />;
}

export function Products() {
  return <DishList title="Products Page" />;
}

export function About() {
  return <h1 className="text-center">About Component</h1>;
}

export function Contact() {
  return <h1 className="text-center">Contact Component</h1>;
}

export function Profile() {
  const { userId } = useParams();

  return (
    <section>
      <h1 className="text-center">Profile Component</h1>
      {userId === undefined ? (
        <div className="text-center">
          <p>No user selected.</p>
          <Link to="/users">Choose a user</Link>
        </div>
      ) : (
        <UserDetails userId={userId} />
      )}
    </section>
  );
}

export function NotFound() {
  return (
    <section className="text-center">
      <h1>404 - Page not found</h1>
      <Link to="/">Back to home</Link>
    </section>
  );
}
