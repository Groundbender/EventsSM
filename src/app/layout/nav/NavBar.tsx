import { NavLink } from "react-router-dom"
import { Button, Container, Menu, MenuItem } from "semantic-ui-react"
import SignedOutButtons from "./SignedOutButtons"
import SignedInMenu from "./SignedInMenu"
import { useState } from "react"


const NavBar = () => {


  const [auth, setAuth] = useState(true)

  return (
    <Menu inverted fixed="top">
      <Container>
        <MenuItem header as={NavLink} to="/">
          <img src="/logo.png" alt="logo" style={{ marginRight: 10 }} />
          Re-vents
        </MenuItem>
        <MenuItem name="Events" as={NavLink} to="/events" />
        <MenuItem>
          <Button as={NavLink} to="/createEvent" floated="right" positive={true} inverted content="Create event" />
        </MenuItem>
        {auth ? <SignedInMenu setAuth={setAuth} /> : <SignedOutButtons setAuth={setAuth} />}
      </Container>
    </Menu>
  )
}
export default NavBar