import { useRouter } from "next/router";

function EventDetail({ post }) {
  const router = useRouter();
  const eventId = router.query.eventId;
  return (
    <>
      <h1>
        {post.id} {post.title}
      </h1>
      <p>{post.body}</p>
    </>
  );
}

export default EventDetail;

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          eventId: "1",
        },
      },
      {
        params: {
          eventId: "2",
        },
      },
      {
        params: {
          eventId: "3",
        },
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.eventId}`
  );
  const data = await response.json();

  return {
    props: {
      post: data,
    },
  };
}
