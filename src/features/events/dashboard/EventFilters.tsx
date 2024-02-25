import { Header, Menu, MenuItem } from "semantic-ui-react"
import 'react-calendar/dist/Calendar.css';
import Calendar from "react-calendar";
import { useState } from "react";
const EventFilters = () => {

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 25 }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <MenuItem content="All events" />
        <MenuItem content="I'm going" />
        <MenuItem content="I'm hosting" />
      </Menu>
      <Header icon="calendar" attached color="teal" content="Select date" />
      <Calendar

        onChange={date => setStartDate(date as Date)}
        value={startDate}
      />
    </>
  )
}
export default EventFilters