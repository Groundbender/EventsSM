import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppEvent } from "../../app/types/events"
import { Timestamp } from "firebase/firestore"

type State = {
  events: AppEvent[]
}


const initialState: State = {
  events: []
}

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: {
      reducer: (state, action: PayloadAction<AppEvent[]>) => {
        state.events = action.payload
      },
      prepare: (events: any) => {
        let eventArray: AppEvent[] = [];

        Array.isArray(events) ? eventArray = events : eventArray.push(events)

        const mapped = eventArray.map((e: any) => {
          return {...e, date: (e.date as Timestamp).toDate().toISOString()}
        })

        return {
          payload: mapped
        }
      }
    },
    // createEvent: (state, action) => {
    //   state.events.push(action.payload)
    // },
    // updateEvent: (state, action) => {
    //   state.events[state.events.findIndex(evt => evt.id === action.payload.id)] = action.payload
    // },
    // deleteEvent: (state, action) => {
    //   state.events.splice(state.events.findIndex(evt => evt.id === action.payload), 1)
    // }
  }
})


export const { setEvents } = eventSlice.actions