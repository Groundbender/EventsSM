import { Button, Icon, Item, ItemGroup, Label, List, Segment, SegmentGroup } from "semantic-ui-react"
import EventListAttendee from "./EventListAttendee"
import { AppEvent, Attendee } from "../../../app/types/events"
import { Link } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../../app/config/firebase"
import { useFireStore } from "../../../app/hooks/firestore/useFirestore"
import { format } from "date-fns"


type Props = {
  event: AppEvent

}
const EventListItem = ({ event }: Props) => {

  // const [loading, setLoading] = useState(false)
  // const { remove } = useFireStore("events")



  // async function removeEvent() {
  //   // setLoading(true);
  //   // try {
  //   //   await deleteDoc(doc(db, "events", event.id));
  //   // } catch (error) {
  //   //   console.log(error);
  //   //   if (error instanceof Error) {
  //   //     toast.error(error.message)
  //   //   }

  //   // } finally {
  //   //   setLoading(false)
  //   // }
  // }



  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image size="tiny" circular src={event.hostPhotoURL || "/user.png"} />
            <Item.Content>
              <Item.Header>{event.title}</Item.Header>
              <Item.Description>
                Hosted by {event.hostedBy}
              </Item.Description>
              {event.isCancelled && (
                <Label
                  style={{ top: '-40px' }}
                  ribbon="right"
                  color="red"
                  content="This event has been cancelled"
                />
              )}
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />{format(new Date(event.date), "dd MMM yyyy, h:mm a")}
          <Icon name="marker" /> {event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee: Attendee) => (
            <EventListAttendee key={attendee.id} attendee={attendee} />
          ))}

        </List>
      </Segment>
      <Segment clearing>
        <span>{event.description}</span>
        {/* <Button onClick={() => remove(event.id)} color="red" floated="right" content="Delete" /> */}
        <Button as={Link} to={`/events/${event.id}`} color="teal" floated="right" content="View" />
      </Segment>
    </SegmentGroup>
  )
}
export default EventListItem