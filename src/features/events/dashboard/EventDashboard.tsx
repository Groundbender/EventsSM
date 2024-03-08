import { Grid, Sticky } from "semantic-ui-react"
import EventList from "./EventList"

import { useAppDispatch, useAppSelector } from "../../../app/store/store"
import { useEffect, useRef, useState } from "react"
import { collection, onSnapshot, query } from "firebase/firestore"
import { db } from "../../../app/config/firebase"
import { AppEvent } from "../../../app/types/events"
import { actions } from "../eventSlice"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import { useFireStore } from "../../../app/hooks/firestore/useFirestore"
import EventFilters from "./EventFilters"
import { QueryOptions } from "../../../app/hooks/firestore/types"
import EventListItemPlaceholder from "./EventListItemPlaceholder"



const EventDashboard = () => {
  const contextRef = useRef()
  const { data: events, status } = useAppSelector(state => state.events)
  // const dispatch = useAppDispatch()
  // const [loading, setLoading] = useState(true)
  const { loadCollection } = useFireStore("events")
  const [query, setQuery] = useState<QueryOptions[]>([
    {
      attribute: "date",
      operator: ">=",
      value: new Date()
    }
  ])

  useEffect(() => {
    // // collection для создания ссылки на коллекцию по имени events 
    // const q = query(collection(db, "events"))
    // //onSnapshot в Firebase Firestore используется для установки слушателя, который отслеживает изменения в реальном времени в определенном запросе или документе.
    // const unsubscribe = onSnapshot(q, {
    //   // querySnapshot - снимок запроса, который содержит обновленные данные 
    //   next: querySnapshot => {
    //     const evts: AppEvent[] = []
    //     console.log(querySnapshot, "querySnapshot");

    //     querySnapshot.forEach(doc => {
    //       console.log(doc, "doc");

    //       console.log(doc.data(), "doc.data()");

    //       evts.push({ id: doc.id, ...doc.data() } as AppEvent)
    //     })

    //     dispatch(actions.success(evts))
    //     setLoading(false)
    //   },
    //   error: err => {
    //     console.log(err)
    //     setLoading(false)
    //   },
    //   // В контексте использования onSnapshot в Firebase Firestore, функция complete не имеет никакого эффекта и никогда не будет вызвана.
    //   //Функция complete предназначена для использования с операциями, которые имеют конечное завершение, например, при работе с потоками данных в RxJS.
    //   complete: () => console.log("never will see this"),

    // })

    // return () => unsubscribe()

    loadCollection(actions, {
      queries: query,
      limit: 2
    })

  }, [loadCollection, query])





  return (
    <Grid>
      <Grid.Column width={10} ref={contextRef}>
        {status === "loading" ? (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        ) : (

          <EventList events={events} />
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        {/* <Sticky context={contextRef.current} offset={98}> */}
        <div className="ui fixed top sticky" style={{ top: 98, width: 405 }}>

          <EventFilters setQuery={setQuery} />
        </div>
        {/* </Sticky> */}
      </Grid.Column>
    </Grid>
  )
}
export default EventDashboard 