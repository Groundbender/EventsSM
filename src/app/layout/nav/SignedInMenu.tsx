import { Link, useNavigate } from "react-router-dom"
import { Dropdown, Image, Menu } from "semantic-ui-react"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { signOut } from "../../../features/auth/authSlice"



const SignedInMenu = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector(state => state.auth)
  function handleSignOut() {
    dispatch(signOut())
    navigate("/")
  }


  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={currentUser?.photoUrl} />
      <Dropdown pointing="top left" text={currentUser?.email}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/createEvent" text="Create Event" icon="plus" />
          <Dropdown.Item text="My prfile" icon="user" />
          <Dropdown.Item text="Sign out" icon="power" onClick={handleSignOut} />

        </Dropdown.Menu>
      </Dropdown>


    </Menu.Item>
  )
}
export default SignedInMenu