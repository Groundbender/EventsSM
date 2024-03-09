import InfiniteScroll from "react-infinite-scroller"
import { AppEvent } from "../../../app/types/events"
import EventListItem from "./EventListItem"

type Props = {
  events: AppEvent[]
  loadMore: () => void
  loading: boolean
  hasMore: boolean
}

const EventList = ({ events, loadMore, loading, hasMore }: Props) => {
  return (
    <>
      {events.length !== 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={!loading && hasMore}
          initialLoad={false}

        >
          {events.map((event: AppEvent) => (
            <EventListItem key={event.id} event={event} />
          ))}

        </InfiniteScroll>
      )}


    </>
  )
}
export default EventList