import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { eventSlice } from "../../features/events/eventSlice";
import { modalSlice } from "../common/modals/modalSlice";
import { authSlice } from "../../features/auth/authSlice";
import { profileSlice } from "../../features/profiles/profileSlice";
import { photosSlice } from "../../features/profiles/photosSlice";



export const store = configureStore({
  reducer: {
    events: eventSlice.reducer,
    modals: modalSlice.reducer,
    auth: authSlice.reducer,
    profiles: profileSlice.reducer,
    photos: photosSlice.reducer
  },
  devTools: true
})



// types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// hooks
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector