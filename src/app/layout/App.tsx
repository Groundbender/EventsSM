import { Container } from "semantic-ui-react"
import EventDashboard from "../../features/events/dashboard/EventDashboard"
import NavBar from "./nav/NavBar"
import { useState } from "react"
import { AppEvent } from "../types/events"

function App() {

  const [formOpen, setFormOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null)

  function handleSelectEvent(event: AppEvent | null) {
    setSelectedEvent(event)
    setFormOpen(true)
  }
  function handleCreateFormOpen() {
    setSelectedEvent(null)
    setFormOpen(true)
  }



  return (
    <>
      <NavBar setFormOpen={handleCreateFormOpen} />
      <Container className="main">
        <EventDashboard selectEvent={handleSelectEvent} selectedEvent={selectedEvent} formOpen={formOpen} setFormOpen={setFormOpen} />
      </Container>
    </>
  )
}



export default App
