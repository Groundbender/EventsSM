import { Button, Container, Menu, MenuItem } from "semantic-ui-react"


type Props = {
  setFormOpen: (value: boolean) => void
}
const NavBar = ({ setFormOpen }: Props) => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <MenuItem header>
          <img src="/logo.png" alt="logo" style={{ marginRight: 10 }} />
          Re-vents
        </MenuItem>
        <MenuItem name="Events" />
        <MenuItem>
          <Button onClick={() => setFormOpen(true)} floated="right" positive={true} inverted content="Create event" />
        </MenuItem>
        <MenuItem position="right">
          <Button basic inverted content="Login" />
          <Button basic inverted content="Register" style={{ marginLeft: "0.5em" }} />
        </MenuItem>
      </Container>
    </Menu>
  )
}
export default NavBar