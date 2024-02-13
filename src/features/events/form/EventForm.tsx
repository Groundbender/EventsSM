import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Form, Header, Segment } from "semantic-ui-react"
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { createEvent, updateEvent } from "../eventSlice";
import { createId } from "@paralleldrive/cuid2";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { categoryOptions } from "./categoryOptions";


const EventForm = () => {
  const { register, handleSubmit, control, setValue, formState: { errors, isValid, isSubmitting } } = useForm({
    mode: 'onBlur',

  });
  let { id } = useParams();
  const event = useAppSelector(state => state.events.events.find(event => event.id === id))
  const dispatch = useAppDispatch()
  const navigate = useNavigate()




  function onSubmit(data: FieldValues) {


    console.log(data);


  }


  return (
    <Segment clearing>
      <Header content="Event Details" sub color="teal" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input placeholder="Event title" defaultValue={event?.title || ""} {...register("title", { required: true })} error={errors.title && "Title is required"} />


        <Controller name="category" control={control} rules={{ required: "Category is required" }} defaultValue={event?.category} render={({ field }) => (
          <Form.Select clearable options={categoryOptions} placeholder=" Category" {...field} onChange={(_, data) => setValue("category", data.value)} error={errors.category && errors.category.message} />


        )} />



        <Form.TextArea placeholder="Description" defaultValue={event?.description || ""} {...register("description", { required: "Description is required" })} error={errors.description && errors.description.message} />

        <Header sub content="Location details" color="teal" />

        <Form.Input placeholder="City" defaultValue={event?.city || ""} {...register("city", { required: "City is required" })} error={errors.city && errors.city.message} />

        <Form.Input placeholder="Venue" defaultValue={event?.venue || ""} {...register("venue", { required: "Venue is required" })} error={errors.venue && errors.venue.message} />

        <Form.Input type="date" placeholder="Date" defaultValue={event?.date || ""} {...register("date", { required: "Date is required" })} error={errors.date && errors.date.message} />
        <Button disabled={!isValid || isSubmitting} type="submit" floated="right" positive content="Submit" />
        <Button as={Link} to="/events" type="button" floated="right" content="Cancel" />
      </Form>
    </Segment>
  )
}
export default EventForm