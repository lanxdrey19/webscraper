import { useRouter } from "next/router";

function Photo() {
  const router = useRouter();
  const { eventId, photoId } = router.query;
  return (
    <>
      <h1>
        Event - {eventId} Photo - {photoId}
      </h1>
    </>
  );
}

export default Photo;
