import Link from "next/link";

function About() {
  return (
    <div>
      <h1>About</h1>
      <Link href="/event">Our Events</Link>
      <Link href="/event/1/photo/1">Our Special Event</Link>
    </div>
  );
}

export default About;
