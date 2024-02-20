import { Link, useNavigate } from "react-router-dom"
import { Dropdown, Image, Menu } from "semantic-ui-react"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { logout } from "../../../features/auth/authSlice"
import { signOut } from "@firebase/auth"
import { auth } from "../../config/firebase"



const SignedInMenu = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector(state => state.auth)
  async function handleSignOut() {
    // dispatch(logout())
    await signOut(auth)
    navigate("/")
  }


  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={currentUser?.photoUrl || "/user.png"} />
      <Dropdown pointing="top left" text={currentUser?.displayName as string}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/createEvent" text="Create Event" icon="plus" />
          <Dropdown.Item text="My profile" icon="user" />
          <Dropdown.Item as={Link} to="account" text="My account" icon="settings" />
          <Dropdown.Item text="Sign out" icon="power" onClick={handleSignOut} />

        </Dropdown.Menu>
      </Dropdown>


    </Menu.Item>
  )
}
export default SignedInMenu