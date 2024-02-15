import { Grid } from "semantic-ui-react"
import EventList from "./EventList"

import { useAppDispatch, useAppSelector } from "../../../app/store/store"
import { useEffect, useState } from "react"
import { collection, onSnapshot, query } from "firebase/firestore"
import { db } from "../../../app/config/firebase"
import { AppEvent } from "../../../app/types/events"
import { setEvents } from "../eventSlice"
import LoadingComponent from "../../../app/layout/LoadingComponent"



const EventDashboard = () => {

  const { events } = useAppSelector(state => state.events)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // collection для создания ссылки на коллекцию по имени events 
    const q = query(collection(db, "events"))
    //onSnapshot в Firebase Firestore используется для установки слушателя, который отслеживает изменения в реальном времени в определенном запросе или документе.
    const unsubscribe = onSnapshot(q, {
      // querySnapshot - снимок запроса, который содержит обновленные данные 
      next: querySnapshot => {
        const evts: AppEvent[] = []
        console.log(querySnapshot, "querySnapshot");

        querySnapshot.forEach(doc => {
          console.log(doc, "doc");

          console.log(doc.data(), "doc.data()");

          evts.push({ id: doc.id, ...doc.data() } as AppEvent)
        })

        dispatch(setEvents(evts))
        setLoading(false)
      },
      error: err => {
        console.log(err)
        setLoading(false)
      },
      // В контексте использования onSnapshot в Firebase Firestore, функция complete не имеет никакого эффекта и никогда не будет вызвана.
      //Функция complete предназначена для использования с операциями, которые имеют конечное завершение, например, при работе с потоками данных в RxJS.
      complete: () => console.log("never will see this"),


    })

    return () => unsubscribe()
  }, [dispatch])


  if (loading) {
    return <LoadingComponent />
  }



  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Filters</h2>
      </Grid.Column>
    </Grid>
  )
}
export default EventDashboard 