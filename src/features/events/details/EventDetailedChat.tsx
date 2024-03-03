import { Button, Comment, Form, Header, Segment } from "semantic-ui-react"
import ChatForm from "./ChatForm"
import { useEffect, useState } from "react"
import { ChatComment } from "../../../app/types/events"
import { onChildAdded, ref } from "firebase/database"
import { fb } from "../../../app/config/firebase"
import { Link } from "react-router-dom"
import { formatDistance } from "date-fns"


type Props = {
  eventId: string
}
const EventDetailedChat = ({ eventId }: Props) => {

  const [comments, setComments] = useState<ChatComment[]>([])
  const [replyForm, setReplyForm] = useState<any>({
    open: false,
    commentId: null
  })



  useEffect(() => {
    const chatRef = ref(fb, `chat/${eventId}`)
    const unsubscribe = onChildAdded(chatRef, data => {
      const comment = { ...data.val(), id: data.key }
      setComments(prevState => [...prevState, comment])
    })

    return () => unsubscribe()

  }, [eventId])


  function createCommentTree(data: ChatComment[]) {
    const table = Object.create(null)
    data.forEach((comment) => table[comment.id] = { ...comment, childNodes: [] })

    console.log(data, "data");
    console.log(table, "table");
    const dataTree: ChatComment[] = []

    data.forEach((comment) => {
      if (comment.parentId) {
        table[comment.parentId].childNodes.push(table[comment.id])
      } else {
        dataTree.push(table[comment.id])
      }
    })

    console.log(dataTree);



    return dataTree
  }

  createCommentTree(comments)

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: 'none' }}
      >
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached style={{ height: 400, overflowY: "scroll" }}>
        <ChatForm eventId={eventId} />
        <Comment.Group style={{ paddingBottom: 0, marginBottom: 0 }}>
          {createCommentTree(comments).reverse().map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.photoURL || "/user.png"} />
              <Comment.Content>
                <Comment.Author
                  as={Link}
                  to={`/profiles/${comment.uid}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistance(comment.date, new Date())} ago </div>
                </Comment.Metadata>
                <Comment.Text>{comment.text}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action
                    onClick={() => setReplyForm({
                      open: true,
                      commentId: comment.id
                    })}
                  >
                    Reply
                  </Comment.Action>
                  {replyForm.open && replyForm.commentId === comment.id && (
                    <ChatForm
                      key={comment.id}
                      eventId={eventId}
                      parentId={comment.id}
                      setReplyForm={setReplyForm}
                    />
                  )}
                </Comment.Actions>
              </Comment.Content>

              <Comment.Group style={{ paddingBottom: 0 }}>
                {comment.childNodes.map((child) => (
                  <Comment key={child.id}>
                    <Comment.Avatar src={child.photoURL || "/user.png"} />
                    <Comment.Content>
                      <Comment.Author
                        as={Link}
                        to={`/profiles/${child.uid}`}>
                        {child.displayName}
                      </Comment.Author>
                      <Comment.Metadata>
                        <div>{formatDistance(child.date, new Date())} ago </div>
                      </Comment.Metadata>
                      <Comment.Text>{child.text}</Comment.Text>
                      <Comment.Actions>
                        <Comment.Action
                          onClick={() => setReplyForm({
                            open: true,
                            commentId: child.id
                          })}
                        >
                          Reply
                        </Comment.Action>
                        {replyForm.open && replyForm.commentId === child.id && (
                          <ChatForm
                            key={child.id}
                            eventId={eventId}
                            parentId={child.parentId}
                            setReplyForm={setReplyForm}
                          />
                        )}
                      </Comment.Actions>
                    </Comment.Content>
                  </Comment>
                ))}

              </Comment.Group>
            </Comment>



          ))}





        </Comment.Group>
      </Segment>
    </>

  )
}
export default EventDetailedChat