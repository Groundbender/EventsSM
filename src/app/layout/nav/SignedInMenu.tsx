import { Link, useNavigate } from "react-router-dom"
import { Dropdown, Image, Menu } from "semantic-ui-react"


type Props = {
  setAuth: (value: boolean) => void
}

const SignedInMenu = ({ setAuth }: Props) => {

  const navigate = useNavigate()

  function handleSignOut() {
    setAuth(false)
    navigate("/")
  }


  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src="/user.png" />
      <Dropdown pointing="top left" text="Bob">
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/createEvent" text="Create Event" icon="plus" />
          <Dropdown.Item text="My prfile" icon="user" />
          <Dropdown.Item text="Sign out" icon="poser" onClick={handleSignOut} />

        </Dropdown.Menu>
      </Dropdown>


    </Menu.Item>
  )
}
export default SignedInMenu