import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Form, Header, Segment } from "semantic-ui-react"


const EventForm = () => {



  const initialValues = {
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

    // selectedEvent ? updateEvent({ ...selectedEvent, ...values }) :
    //   addEvent({
    //     ...values,
    //     hostedBy: "Bob",
    //     attendees: [],
    //     hostPhotoURL: "",
    //     id: createId(),
    //   })

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
      <Header content="Create event" />
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