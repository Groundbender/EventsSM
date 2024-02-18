import { Button, Form, Label } from "semantic-ui-react"
import ModalWrapper from "../../app/common/modals/ModalWrapper"
import { FieldValues, useForm } from "react-hook-form"
import { useAppDispatch } from "../../app/store/store"
import { closeModal } from "../../app/common/modals/modalSlice"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "@firebase/auth"
import { auth } from "../../app/config/firebase"
import { signIn } from "./authSlice"

const RegsiterForm = () => {

  const { register, handleSubmit, setError, formState: { errors, isSubmitting, isValid, isDirty } } = useForm({
    mode: "onTouched"
  })

  const dispatch = useAppDispatch();

  async function onSubmit(data: FieldValues) {

    try {

      const userCreds = await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log(userCreds, "userCreds");

      await updateProfile(userCreds.user, {
        displayName: data.displayName
      })

      dispatch(signIn(userCreds.user))
      dispatch(closeModal())

      // console.log(result);
    } catch (error) {
      console.log(error);

      setError("root.serverError", {
        type: "400", message: (error as Error).message
      })

    }

  }

  return (
    <ModalWrapper header="Sign up">
      <Form onSubmit={handleSubmit(onSubmit)}>

        <Form.Input
          type="email"
          placeholder="Email"
          defaultValue=""
          {...register("email", { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
          error={errors.email?.type === "required" && "Email is required" || errors.email?.type === "pattern" && "Email is not valid"}
        />
        <Form.Input
          placeholder="Display name"
          defaultValue=""
          {...register("displayName", { required: true })}
          error={errors.displayName?.type === "required" && "Display name is required"}
        />
        <Form.Input
          type="password"
          placeholder="Password"
          defaultValue=""
          {...register("password", { required: true, minLength: 5 })}
          error={errors.password?.type === "required" && "Password is required" || errors.password?.type === "minLength" && "Password should be at least 5 characters"}
        />
        {errors.root && (

          <Label
            basic
            color="red"
            style={{ display: "block", marginBottom: 10 }}
            content={errors.root.serverError.message}
          />
        )}

        <Button
          loading={isSubmitting}
          disabled={!isValid || !isDirty || isSubmitting}
          type="submit"
          fluid
          size="large"
          color="teal"
          content="Register"
        />
      </Form>
    </ModalWrapper >
  )
}
export default RegsiterForm