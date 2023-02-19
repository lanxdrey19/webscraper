import Link from "next/link";

function Event({ posts }) {
  return (
    <>
      <h1>Lists of Events</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Link href={`event/${post.id}`} passHref>
              <h2>
                {post.id} {post.title}
              </h2>
            </Link>
            <hr />
          </div>
        );
      })}
    </>
  );
}

export default Event;

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  return {
    props: {
      posts: data,
    },
  };
}
