import { FieldValues, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { Form, Loader } from "semantic-ui-react"
import { KeyboardEvent } from "react"
import { push, ref, set } from "firebase/database"
import { auth, fb } from "../../../app/config/firebase"

type Props = {
  eventId: string
}


const ChatForm = ({ eventId }: Props) => {

  const { register, reset, handleSubmit, formState: { isSubmitting } } = useForm({
    mode: "onTouched",
    defaultValues: {
      comment: ""
    }
  })

  async function onSubmit(data: FieldValues) {
    try {
      const chatRef = ref(fb, `chat/${eventId}`)
      const newChatRef = push(chatRef)
      await set(newChatRef, {
        displayName: auth.currentUser?.displayName,
        photoURL: auth.currentUser?.photoURL,
        uid: auth.currentUser?.uid,
        text: data.comment,
        date: Date.now()
      })
      console.log(data)
      reset()
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <Form >
      <Form.TextArea
        placeholder="Enter your comment (Enter to submit, shift + enter for new line)"
        {...register("comment", { required: true })}
        onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === "Enter" && e.shiftKey) {
            return
          }
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(onSubmit)()
          }
        }}
      />
      <Loader active={isSubmitting} />
    </Form>
  )
}
export default ChatForm