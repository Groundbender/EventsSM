import { ChangeEvent, useState } from "react"
import { Button, Form, Header, Segment } from "semantic-ui-react"
import { AppEvent } from "../../../app/types/events"
import { createId } from "@paralleldrive/cuid2"

type Props = {
  setFormOpen: (value: boolean) => void
  addEvent: (event: AppEvent) => void
  selectedEvent: AppEvent | null
  updateEvent: (updatedEvent: AppEvent) => void
}

const EventForm = ({ setFormOpen, addEvent, selectedEvent, updateEvent }: Props) => {



  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: ''
  }


  const [values, setValues] = useState(initialValues)


  function onSubmit() {
    selectedEvent ? updateEvent({ ...selectedEvent, ...values }) :
      addEvent({
        ...values,
        hostedBy: "Bob",
        attendees: [],
        hostPhotoURL: "",
        id: createId(),
      })

  }

  function handleInputsChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;


    setValues({
      ...values,
      [name]: value
    })
  }

  return (
    <Segment clearing>
      <Header content={selectedEvent ? "Edit event" : "Create event"} />
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <input type="text" placeholder="Event title" name="title" value={values.title} onChange={e => handleInputsChange(e)} />
        </Form.Field>
        <Form.Field>
          <input name="category" value={values.category} onChange={e => handleInputsChange(e)} type="text" placeholder="Category" />
        </Form.Field>
        <Form.Field>
          <input name="description" value={values.description} onChange={e => handleInputsChange(e)} type="text" placeholder="Description" />
        </Form.Field>
        <Form.Field>
          <input name="city" value={values.city} onChange={e => handleInputsChange(e)} type="text" placeholder="City" />
        </Form.Field>
        <Form.Field>
          <input name="venue" value={values.venue} onChange={e => handleInputsChange(e)} type="text" placeholder="Venue" />
        </Form.Field>
        <Form.Field>
          <input name="date" value={values.date} onChange={e => handleInputsChange(e)} type="date" placeholder="Date" />
        </Form.Field>

        <Button type="submit" floated="right" positive content="Submit" />
        <Button onClick={() => setFormOpen(false)} type="button" floated="right" content="Cancel" />
      </Form>
    </Segment>
  )
}
export default EventForm