import { NavLink } from "react-router-dom"
import { Button, Container, Menu, MenuItem } from "semantic-ui-react"
import SignedOutButtons from "./SignedOutButtons"
import SignedInMenu from "./SignedInMenu"
import { useAppSelector } from "../../store/store"
import { sampleData } from "../../api/sampleData"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../config/firebase"


const NavBar = () => {

  const { authenticated } = useAppSelector((state) => state.auth)


  // function seedData() {
  //   sampleData.forEach((async event => {
  //     const { id, ...rest } = event;
  //     // Функция doc() в Firestore используется для создания ссылки на определенный документ в базе данных Firestore.
  //     // db - наша база данных из конфига
  //     // events - название коллекции
  //     // id - id документа event в коллекции events
  //     await setDoc(doc(db, "events", id), {
  //       ...rest
  //     })
  //   }))
  // }


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
        {/* {import.meta.env.DEV && (
          <MenuItem>
            <Button
              inverted
              color="teal"
              content="Show sample data"
              onClick={seedData}
            />
          </MenuItem>
        )} */}
        {authenticated ? <SignedInMenu /> : <SignedOutButtons />}
      </Container>
    </Menu>
  )
}
export default NavBar