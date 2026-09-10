import { Button } from "@mui/material";
import { getEventById } from "../../../../api/endpoints/events";

const EventButton = () => {
  const handleGetEvent = async (eventId: number) => {
    try {
      const event = await getEventById(eventId);

      console.log(event);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={() => handleGetEvent(1)}>Get Event 1</Button>

      <Button onClick={() => handleGetEvent(2)}>Get Event 2</Button>

      <Button onClick={() => handleGetEvent(3)}>Get Event 3</Button>

      <Button onClick={() => handleGetEvent(4)}>Get Event 4</Button>

      <Button onClick={() => handleGetEvent(5)}>Get Event 5</Button>
    </>
  );
};

export default EventButton;
