import { useParams } from "react-router-dom"
import { Grid } from "semantic-ui-react"
import EventDetailedHeader from "./EventDetailedHeader"
import EventDetailedInfo from "./EventDetailedInfo"
import EventDetailedChat from "./EventDetailedChat"
import EventDetailedSidebar from "./EventDetailedSidebar"
import { useAppSelector } from "../../../app/store/store"

const EventDetailsPage = () => {
  const { id } = useParams();
  const event = useAppSelector(state => state.events.events.find(event => event.id === id))


  if (!event) return <h2>Event not found</h2>

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar />
      </Grid.Column>
    </Grid>
  )
}
export default EventDetailsPage