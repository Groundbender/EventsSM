import { Grid } from "semantic-ui-react"
import EventList from "./EventList"
import EventForm from "../form/EventForm"
import { sampleData } from "../../../app/api/sampleData"
import { useEffect, useState } from "react"
import { AppEvent } from "../../../app/types/events"

type Props = {
  formOpen: boolean
  setFormOpen: (formOpen: boolean) => void
  selectEvent: (event: AppEvent | null) => void
  selectedEvent: AppEvent | null
}

const EventDashboard = ({ formOpen, setFormOpen, selectEvent, selectedEvent }: Props) => {

  const [events, setEvents] = useState<AppEvent[]>([])
  useEffect(() => {
    setEvents(sampleData)
  }, [])


  function addEvent(event: AppEvent) {
    setEvents(prev => [...prev, event])
    setFormOpen(false)
  }

  function updateEvent(updatedEvent: AppEvent) {
    setEvents(prev => prev.map(event => event.id === updatedEvent.id ? updatedEvent : event))
    selectEvent(null)
    setFormOpen(false)
  }

  function deleteEvent(eventId: string) {
    setEvents(prev => prev.filter(event => event.id !== eventId))
  }



  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList deleteEvent={deleteEvent} selectEvent={selectEvent} events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && <EventForm updateEvent={updateEvent} selectedEvent={selectedEvent} addEvent={addEvent} setFormOpen={setFormOpen} key={selectedEvent ? selectedEvent.id : "create"} />}
      </Grid.Column>
    </Grid>
  )
}
export default EventDashboard 