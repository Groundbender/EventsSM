import { Image, List } from "semantic-ui-react"
import { Attendee } from "../../../app/types/events"
import { Link } from "react-router-dom"


type Props = {
  attendee: Attendee
}
const EventListAttendee = ({ attendee }: Props) => {
  return (
    <List.Item as={Link} to={`/profiles/${attendee.id}`}>
      <Image size="mini" circular src={attendee.photoURL} />
    </List.Item>
  )
}
export default EventListAttendee