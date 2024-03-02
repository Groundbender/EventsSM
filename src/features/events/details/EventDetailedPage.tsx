import { useParams } from "react-router-dom"
import { Grid } from "semantic-ui-react"
import EventDetailedHeader from "./EventDetailedHeader"
import EventDetailedInfo from "./EventDetailedInfo"
import EventDetailedChat from "./EventDetailedChat"
import EventDetailedSidebar from "./EventDetailedSidebar"
import { useAppDispatch, useAppSelector } from "../../../app/store/store"
import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { actions } from "../eventSlice"
import { db } from "../../../app/config/firebase"
import { toast } from "react-toastify"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import { useFireStore } from "../../../app/hooks/firestore/useFirestore"

const EventDetailsPage = () => {
  const { id } = useParams();
  const event = useAppSelector(state => state.events.data.find(event => event.id === id))

  const { status } = useAppSelector(state => state.events)
  // const dispatch = useAppDispatch()
  // const [loading, setLoading] = useState(true)
  const { loadDocument } = useFireStore("events")

  // useEffect(() => {
  //    // if (!id) return
  //   // const unsubscribe = onSnapshot(doc(db, "events", id), {
  //   //   next: doc => {
  //   //     dispatch(actions.success({ id: doc.id, ...doc.data() } as any))
  //   //     setLoading(false)
  //   //   },
  //   //   error: err => {
  //   //     console.log(err)
  //   //     toast.error(err.message)
  //   //     setLoading(false)
  //   //   }
  //   // })
  //   return () => {
  //     unsubscribe()
  //   }
  // }, [id, dispatch])

  useEffect(() => {
    if (!id) return

    loadDocument(id, actions)

  }, [id, loadDocument])


  if (status === "loading") {
    return <LoadingComponent />
  }



  if (!event) return <h2>Event not found</h2>

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat eventId={event.id} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar event={event} />
      </Grid.Column>
    </Grid>
  )
}
export default EventDetailsPage