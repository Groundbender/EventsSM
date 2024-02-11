import { AppEvent } from "../../../app/types/events"
import EventListItem from "./EventListItem"

type Props = {
  events: AppEvent[]
  selectEvent: (event: AppEvent) => void
  deleteEvent: (eventId: string) => void
}

const EventList = ({ events, selectEvent, deleteEvent }: Props) => {
  return (
    <>
      {events.map((event: AppEvent) => (
        <EventListItem selectEvent={selectEvent} key={event.id} event={event} deleteEvent={deleteEvent} />
      ))}

    </>
  )
}
export default EventList