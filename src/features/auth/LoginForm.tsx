import { Button, Form } from "semantic-ui-react"
import ModalWrapper from "../../app/common/modals/ModalWrapper"
import { FieldValues, useForm } from "react-hook-form"
import { useAppDispatch } from "../../app/store/store"
import { closeModal } from "../../app/common/modals/modalSlice"
import { signIn } from "./authSlice"

const LoginForm = () => {

  const { register, handleSubmit, formState: { errors, isSubmitting, isValid, isDirty } } = useForm({
    mode: "onTouched"
  })

  const dispatch = useAppDispatch();

  function onSubmit(data: FieldValues) {
    console.log(data);
    dispatch(signIn(data))
    dispatch(closeModal())

  }

  return (
    <ModalWrapper header="Sign in">
      <Form onSubmit={handleSubmit(onSubmit)}>

        <Form.Input
          type="email"
          placeholder="Email"
          defaultValue=""
          {...register("email", { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
          error={errors.email?.type === "required" && "Email is required" || errors.email?.type === "pattern" && "Email is not valid"}
        />
        <Form.Input
          type="password"
          placeholder="Password"
          defaultValue=""
          {...register("password", { required: true, minLength: 5 })}
          error={errors.password?.type === "required" && "Password is required" || errors.password?.type === "minLength" && "Password should be at least 5 characters"}
        />

        <Button
          loading={isSubmitting}
          disabled={!isValid || !isDirty || isSubmitting}
          type="submit"
          fluid
          size="large"
          color="teal"
          content="Login"
        />
      </Form>
    </ModalWrapper>
  )
}
export default LoginForm