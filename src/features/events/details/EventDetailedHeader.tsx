import { Link, useParams } from "react-router-dom"
import { Button, Header, Item, Segment, Image } from "semantic-ui-react"
import { AppEvent } from "../../../app/types/events"
import { useAppSelector } from "../../../app/store/store"
import { toast } from "react-toastify"
import { useState } from "react"
import { useFireStore } from "../../../app/hooks/firestore/useFirestore"
import { arrayRemove, arrayUnion } from "firebase/firestore"


type Props = {
  event: AppEvent
}

const EventDetailsHeader = ({ event }: Props) => {


  const { id } = useParams()
  const { currentUser } = useAppSelector(state => state.auth)
  const [loading, setLoading] = useState(false)
  const { update } = useFireStore("events")


  const eventsImageStyle = {
    filter: 'brightness(30%)'
  }
  const eventsImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
  }

  async function toggleAttendance() {
    if (!currentUser) {
      toast.error("You must be logged in to attend an event")
      return
    }
    setLoading(true)

    if (event.isGoing) {
      const attendee = event.attendees.find((a) => a.id === currentUser.uid)
      await update(event.id, {
        attendees: arrayRemove(attendee),
        attendeeIds: arrayRemove(currentUser.uid)
      })

      setLoading(false)
    } else {

      await update(event.id, {
        attendees: arrayUnion({
          id: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoUrl
        }),
        attendeeIds: arrayUnion(currentUser.uid)
      })
      setLoading(false)

    }


  }


  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image src={`/categoryImages/${event.category}.jpg`} fluid style={eventsImageStyle} />

        <Segment basic style={eventsImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: 'white' }}
                />
                <p>{event.date}</p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom" clearing>
        {/* <Button>Cancel My Place</Button>
        <Button color="teal">JOIN THIS EVENT</Button> */}
        {event.isHost ? (
          <Button as={Link} to={`/manage/${event.id}`} color="orange" floated="right">
            Manage Event
          </Button>
        ) : (
          <Button content={event.isGoing ? "Cancel my place" : "Join this event"} color={event.isGoing ? "grey" : "teal"}
            onClick={toggleAttendance}
            loading={loading}
          />
        )}


      </Segment>
    </Segment.Group>
  )
}
export default EventDetailsHeader