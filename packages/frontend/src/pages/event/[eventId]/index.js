import { useRouter } from "next/router";

function EventDetail() {
  const router = useRouter();
  const eventId = router.query.eventId;
  return (
    <>
      <h1>Details about event {eventId}</h1>
    </>
  );
}

export default EventDetail;
