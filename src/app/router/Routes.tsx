import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventDetailedPage from "../../features/events/details/EventDetailedPage";
import EventForm from "../../features/events/form/EventForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/events",
        element: <EventDashboard />
      },
      {
        path: "/events/:id",
        element: <EventDetailedPage />
      },
      {
        path: "/createEvent",
        element: <EventForm />
      },
      // {
      //   path: "/manage/:id",
      //   element: <EventForm />
      // },
    ]
  }
])