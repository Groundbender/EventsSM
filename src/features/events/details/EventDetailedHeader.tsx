import { Link, useParams } from "react-router-dom"
import { Button, Header, Item, Segment, Image } from "semantic-ui-react"
import { AppEvent } from "../../../app/types/events"


type Props = {
  event: AppEvent
}

const EventDetailsHeader = ({ event }: Props) => {


  const { id } = useParams()

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

      <Segment attached="bottom">
        <Button>Cancel My Place</Button>
        <Button color="teal">JOIN THIS EVENT</Button>

        <Button as={Link} to={`/manage/${event.id}`} color="orange" floated="right">
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  )
}
export default EventDetailsHeader