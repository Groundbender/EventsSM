import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Form, Header, Segment } from "semantic-ui-react"
import { useAppSelector } from "../../../app/store/store";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { categoryOptions } from "./categoryOptions";
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"
import { AppEvent } from "../../../app/types/events";
import { Timestamp, arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../app/config/firebase";
import { toast } from "react-toastify";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
import { useEffect } from "react";
import { actions } from "../eventSlice";
import LoadingComponent from "../../../app/layout/LoadingComponent";


const EventForm = () => {

  const { register, handleSubmit, control, setValue, formState: { errors, isValid, isSubmitting } } = useForm({
    mode: 'onBlur',
    defaultValues: async () => {
      if (event) {
        return { ...event, date: new Date(event.date) }
      }
    }


  });
  const { id } = useParams();
  const event = useAppSelector(state => state.events.data.find(event => event.id === id))
  // const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loadDocument, create, update } = useFireStore("events");
  const { status } = useAppSelector((state) => state.events)
  const { currentUser } = useAppSelector((state) => state.auth)



  useEffect(() => {
    if (!id) return
    loadDocument(id, actions)
  }, [id, loadDocument])




  async function updateEvent(data: AppEvent) {
    if (!event) return

    await update(event.id, {
      ...data,
      date: Timestamp.fromDate(data.date as unknown as Date)
    })

    // doc создает ссылку на конкретный документ в коллекции "events" с указанным идентификатором event.id.
    // updateDoc выполняет асинхронное обновление указанного документа с новыми данными ...data.
    // const docRef = doc(db, "events", event.id)
    // await updateDoc(docRef, {
    //   ...data, date: Timestamp.fromDate(data.date as unknown as Date)
    // })
  }


  async function createEvent(data: FieldValues) {

    if (!currentUser) return

    const ref = await create({
      ...data,
      hostUid: currentUser.uid,
      hostedBy: currentUser.displayName,
      hostPhotoURL: currentUser.photoUrl,
      attendees: arrayUnion({
        id: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoUrl
      }),
      attendeeIds: arrayUnion(currentUser.uid),
      date: Timestamp.fromDate(data.date as unknown as Date)
    })


    return ref

    // подход чтобы сгенерировать id изначально, если setDoc - нам нужна передать id, если addDoc - firebase сгенерирует его за нас 
    // тут мы получим id из newEventRef
    // const newEventRef = doc(collection(db, "events"));
    // await setDoc(newEventRef, {
    //   ...data,
    //   hostedBy: "bob",
    //   attendees: [],
    //   hostPhotoURL: "",
    //   date: Timestamp.fromDate(data.date as unknown as Date)
    // })

    // return newEventRef
  }

  async function handleCancelToggle(event: AppEvent) {
    await update(event.id, {
      isCancelled: !event.isCancelled
    })
    toast.success(`Event has been ${event.isCancelled ? "Uncancelled" : "Cancelled"}`)
  }




  async function onSubmit(data: FieldValues) {
    try {
      if (event) {
        await updateEvent({ ...event, ...data })
        navigate(`/events/${event.id}`)
      } else {

        const ref = await createEvent(data)
        // id из newEventRef 
        navigate(`/events/${ref?.id}`)
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
        console.log(e.message);
      }

    }
  }


  if (status === "loading") {
    return <LoadingComponent />
  }



  return (
    <Segment clearing>
      <Header content="Event Details" sub color="teal" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input placeholder="Event title" defaultValue={event?.title || ""} {...register("title", { required: true })} error={errors.title && "Title is required"} />


        <Controller name="category" control={control} rules={{ required: "Category is required" }} defaultValue={event?.category} render={({ field }) => (
          <Form.Select clearable options={categoryOptions} placeholder=" Category" {...field} onChange={(_, data) => setValue("category", data.value, {
            shouldValidate: true
          })} error={errors.category && errors.category.message} />


        )} />



        <Form.TextArea placeholder="Description" defaultValue={event?.description || ""} {...register("description", { required: "Description is required" })} error={errors.description && errors.description.message} />

        <Header sub content="Location details" color="teal" />

        <Form.Input placeholder="City" defaultValue={event?.city || ""} {...register("city", { required: "City is required" })} error={errors.city && errors.city.message} />

        <Form.Input placeholder="Venue" defaultValue={event?.venue || ""} {...register("venue", { required: "Venue is required" })} error={errors.venue && errors.venue.message} />

        <Form.Field>
          <Controller name="date" control={control}
            rules={{ required: "Date is required" }}
            defaultValue={event && new Date(event.date) || null}
            render={({ field }) => (
              <DatePicker
                placeholderText="Event date and time"
                selected={field.value}
                showTimeSelect
                timeCaption="time"
                autoComplete="off"
                dateFormat="MMMM d, yyyy h:mm aa"
                {...field}
                onChange={(value) => setValue("date", value, {
                  shouldValidate: true
                })}
              />
            )}

          />

        </Form.Field>

        {/* <Form.Input type="date" placeholder="Date" defaultValue={event?.date || ""} {...register("date", { required: "Date is required" })} error={errors.date && errors.date.message} /> */}



        {event && (
          <Button
            floated="left"
            type="button"
            color={event.isCancelled ? "green" : "red"}
            content={event.isCancelled ? "Re-activate Event" : "Cancel Event"}
            onClick={() => handleCancelToggle(event)}

          />
        )}


        <Button disabled={!isValid || isSubmitting} type="submit" floated="right" positive content="Submit" />
        <Button as={Link} to="/events" type="button" floated="right" content="Cancel" />
      </Form>
    </Segment>
  )
}
export default EventForm