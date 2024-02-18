import { Button, MenuItem } from "semantic-ui-react"
import { useAppDispatch } from "../../store/store"
import { openModal } from "../../common/modals/modalSlice"

const SignedOutButtons = () => {

  const dispatch = useAppDispatch()


  return (
    <MenuItem position="right">
      <Button onClick={() => dispatch(openModal({ type: "LoginForm" }))} basic inverted content="Login" />
      <Button onClick={() => dispatch(openModal({ type: "RegisterForm" }))} basic inverted content="Register" style={{ marginLeft: "0.5em" }} />
    </MenuItem>
  )
}
export default SignedOutButtons