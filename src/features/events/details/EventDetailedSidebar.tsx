import { Item, Label, Segment } from "semantic-ui-react"
import { AppEvent } from "../../../app/types/events"
import { Link } from "react-router-dom"


type Props = {
  event: AppEvent
}
const EventDetailedSidebar = ({ event }: Props) => {
  return (

    <>
      <Segment
        textAlign="center"
        style={{ border: 'none' }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {event.attendees.length} People Going
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {event.attendees.map((attendee) => (
            <Item key={attendee.id} style={{ position: 'relative' }}>
              {event.hostUid === attendee.id && (
                <Label style={{ position: 'absolute' }} color="orange" ribbon="right" >Host</Label>
              )}
              <Item.Image size="tiny" src={attendee.photoURL || '/user.png'} />
              <Item.Content as={Link} to={`/profiles/${attendee.id}`} verticalAlign="middle">
                <Item.Header as="h3">
                  <span>{attendee.displayName}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}


        </Item.Group>
      </Segment>
    </>
  )
}
export default EventDetailedSidebar