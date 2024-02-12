import { ChangeEvent, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Form, Header, Segment } from "semantic-ui-react"
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { createEvent, updateEvent } from "../eventSlice";
import { createId } from "@paralleldrive/cuid2";


const EventForm = () => {
  let { id } = useParams();
  const event = useAppSelector(state => state.events.events.find(event => event.id === id))
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const initialValues = event ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: ''
  }


  const [values, setValues] = useState(initialValues)


  function onSubmit() {
    console.log(values);
    id = id ?? createId()

    event ? dispatch(updateEvent({ ...event, ...values })) :
      dispatch(createEvent({
        ...values,
        hostedBy: "Bob",
        attendees: [],
        hostPhotoURL: "/assets/user.png",
        id
      }))


    navigate(`/events/${id}`)

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
      <Header content={event ? 'Edit the event' : 'Create new event'} />
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
        <Button as={Link} to="/events" type="button" floated="right" content="Cancel" />
      </Form>
    </Segment>
  )
}
export default EventForm