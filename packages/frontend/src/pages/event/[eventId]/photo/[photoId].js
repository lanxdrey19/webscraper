import { useRouter } from "next/router";
import Link from "next/link";

function Photo() {
  const router = useRouter();
  const { eventId, photoId } = router.query;
  return (
    <>
      <h1>
        Event - {eventId} Photo - {photoId}
      </h1>
      <Link href="/">Home</Link>
    </>
  );
}

export default Photo;
