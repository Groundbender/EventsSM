import { Header, Menu, MenuItem } from "semantic-ui-react"
import 'react-calendar/dist/Calendar.css';
import Calendar from "react-calendar";
import { useRef, useState } from "react";
import { QueryOptions } from "../../../app/hooks/firestore/types";
import { useAppSelector } from "../../../app/store/store";


type Props = {
  setQuery: (query: QueryOptions[]) => void
}

const EventFilters = ({ setQuery }: Props) => {

  // const [startDate, setStartDate] = useState(new Date())
  const startDate = useRef(new Date())
  const [filter, setFilter] = useState("all")
  const { currentUser } = useAppSelector(state => state.auth)
  const { status } = useAppSelector(state => state.events)


  function handleSetFilter(filter: string) {
    if (!currentUser?.uid) return

    let q: QueryOptions[];

    switch (filter) {
      case "isGoing":
        q = [
          {
            attribute: "attendeeIds",
            operator: "array-contains",
            value: currentUser?.uid
          },
          {
            attribute: "date",
            operator: ">=",
            value: startDate.current
          }
        ]

        break;
      case "isHost":
        q = [
          {
            attribute: "hostUid",
            operator: "==",
            value: currentUser?.uid
          },
          {
            attribute: "date",
            operator: ">=",
            value: startDate.current
          }
        ]
        break;

      default:
        q = [
          {
            attribute: "date",
            operator: ">=",
            value: startDate.current
          }
        ]
        break;
    }

    setFilter(filter)
    setQuery(q)
  }

  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 25 }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <MenuItem onClick={() => handleSetFilter("all")} content="All events" active={filter === "all"} disabled={status === "loading"} />
        <MenuItem onClick={() => handleSetFilter("isGoing")} content="I'm going" active={filter === "isGoing"} disabled={status === "loading"} />
        <MenuItem onClick={() => handleSetFilter("isHost")} content="I'm hosting" active={filter === "isHost"} disabled={status === "loading"} />
      </Menu>
      <Header icon="calendar" attached color="teal" content="Select date" />
      <Calendar

        onChange={date => {
          startDate.current = date as Date;
          console.log(startDate.current, "date");
          handleSetFilter(filter)
        }}
        value={startDate.current}
      />
    </>
  )
}
export default EventFilters