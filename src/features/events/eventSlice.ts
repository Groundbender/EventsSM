import { PayloadAction, SliceCaseReducers, createSlice } from "@reduxjs/toolkit"
import { AppEvent } from "../../app/types/events"
import { Timestamp } from "firebase/firestore"
import { GenericActions, GenericState, createGenericSlice } from "../../app/store/genericSlice"
import { auth } from "../../app/config/firebase"

type State = {
  data: AppEvent[]
}


const initialState: State = {
  data: []
}

export const eventSlice = createGenericSlice({
  name: "events",
  initialState: initialState as  GenericState<AppEvent[]>,
  reducers: {
    success: {
      reducer: (state, action: PayloadAction<AppEvent[]>) => {
        state.data = [...state.data, ...action.payload]
        state.status = 'finished'
      },
      prepare: (events: any) => {
        let eventArray: AppEvent[] = [];

        Array.isArray(events) ? eventArray = events : eventArray.push(events)

        const mapped = eventArray.map((e: any) => {
          return {
            ...e, 
            date: (e.date as Timestamp).toDate().toISOString(),
            isHost: auth.currentUser?.uid === e.hostUid,
            isGoing: e.attendeeIds.includes(auth.currentUser?.uid)
          }
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


export const actions = eventSlice.actions as GenericActions<AppEvent[]>