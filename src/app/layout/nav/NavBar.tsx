import { NavLink } from "react-router-dom"
import { Button, Container, Menu, MenuItem } from "semantic-ui-react"
import SignedOutButtons from "./SignedOutButtons"
import SignedInMenu from "./SignedInMenu"
import { useState } from "react"
import { useAppSelector } from "../../store/store"


const NavBar = () => {

  const { authenticated } = useAppSelector((state) => state.auth)


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
        {authenticated ? <SignedInMenu /> : <SignedOutButtons />}
      </Container>
    </Menu>
  )
}
export default NavBar