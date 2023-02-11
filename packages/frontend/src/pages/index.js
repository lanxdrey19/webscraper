import Link from "next/link";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/event");
  };

  return (
    <>
      <h1>Home Page</h1>
      <button onClick={handleClick}>Events</button>
    </>
  );
}

export default Home;
