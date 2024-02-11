import { AppEvent } from "../../../app/types/events"
import EventListItem from "./EventListItem"

type Props = {
  events: AppEvent[]
}

const EventList = ({ events }: Props) => {
  return (
    <>
      {events.map((event: AppEvent) => (
        <EventListItem key={event.id} event={event} />
      ))}

    </>
  )
}
export default EventList