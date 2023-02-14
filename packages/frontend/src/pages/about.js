import Link from "next/link";
import User from "../components/user";

function About({ users }) {
  return (
    <div>
      <h1>About</h1>
      <Link href="/event">Our Events</Link>
      <Link href="/event/1/photo/1">Our Special Event</Link>
      <h1>Committee</h1>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <User user={user} />
          </div>
        );
      })}
    </div>
  );
}

export default About;

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  return {
    props: {
      users: data,
    },
  };
}
