import { Image, List } from "semantic-ui-react"
import { Attendee } from "../../../app/types/events"


type Props = {
  attendee: Attendee
}
const EventListAttendee = ({ attendee }: Props) => {
  return (
    <List.Item>
      <Image size="mini" circular src={attendee.photoURL} />
    </List.Item>
  )
}
export default EventListAttendee