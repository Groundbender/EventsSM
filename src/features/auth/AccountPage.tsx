import { FieldValues, useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { Button, Form, Header, Icon, Segment } from "semantic-ui-react";
import { useAppSelector } from "../../app/store/store";
import { useEffect } from "react";

const AccountPage = () => {

  const { currentUser } = useAppSelector(state => state.auth)

  const { register, handleSubmit, formState: { errors, isSubmitting, isValid }, getValues, watch, trigger } = useForm({
    mode: "onTouched"
  })

  // когда мы заполняем второе поле и пароли не совпадают, показывается ошибка, но когда мы в процессе меняем первое поле, ошибки нет, поэтому с помощью watch отслеживаем для первого поля состояние второго 
  const password1 = watch("password1")
  const password2 = watch("password2")


  useEffect(() => {
    if (password2) trigger("password2")
  }, [password2, trigger, password1])

  function onSubmit(data: FieldValues) {
    console.log(data);

  }


  return (
    <Segment>
      <Header content="Account" dividing size="large" />
      {currentUser?.providerId === "password" && (
        <div>
          <Header color="teal" sub content="Change password" />
          <p>Use this form to change your password</p>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Input
              type="password"
              defaultValue=""
              placeholder="Password"
              {...register("password1", {
                required: true,

              })}
              error={errors.password1 && "Password is required"}
            />
            <Form.Input
              type="password"
              defaultValue=""
              placeholder="Confirm Password"
              {...register("password2", {
                required: true,
                validate: {
                  passwordMatch: value => (value === getValues().password1 || "Passwords do not match")
                }

              })}
              error={errors.password2?.type === "required" && "Confirm Password is required" || errors.password2?.type === "passwordMatch" && errors.password2.message}
            />
            <Button disabled={!isValid || isSubmitting} loading={isSubmitting} size="large" positive type="submit" content="Update password" />
          </Form>

        </div>
      )}
      {currentUser?.providerId === "github.com" && (
        <div>
          <Header color="teal" sub content="Github account" />
          <p>Please visit Github to update your account settings</p>
          <Button as={Link} to="https://github.com" color="black">
            <Icon name="github" /> Go to Github
          </Button>
        </div>

      )}
      {currentUser?.providerId === "google.com" && (
        <div>
          <Header color="teal" sub content="Google account" />
          <p>Please visit Google to update your account settings</p>
          <Button as={Link} to="https://github.com" color="google plus">
            <Icon name="google" /> Go to Google
          </Button>
        </div>

      )}

    </Segment>
  )
}
export default AccountPage