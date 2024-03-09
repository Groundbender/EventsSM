import { Button, Divider, Grid, Header, Icon, Segment } from "semantic-ui-react"
import { useAppDispatch } from "../store/store"
import { openModal } from "../common/modals/modalSlice"
import { useLocation, useNavigate } from "react-router-dom";

const UnauthComponent = () => {
  const dispatch = useAppDispatch();
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from || "/events"
  return (
    <Segment>
      <Grid columns={2} stackable textAlign="center">
        <Divider vertical>Or</Divider>
        <Grid.Row verticalAlign="middle">
          <Grid.Column textAlign="center">
            <Header icon>
              <Icon name="lock" />
              You need to be signed up to do that
            </Header>
            <br />
            <Button.Group>
              <Button color="teal" content="Login" onClick={() => dispatch(openModal({ type: "LoginForm", data: { from } }))} />
              <Button.Or />
              <Button color="teal" content="Register" onClick={() => dispatch(openModal({ type: "RegisterForm", data: { from } }))} />
            </Button.Group>
          </Grid.Column>
          <Grid.Column>
            <Header icon>
              <Icon name="angle left" />
              Go back
              <Button style={{ marginLeft: "0.5em" }} content="Cancel" onClick={() => navigate(-1)} />
            </Header>
          </Grid.Column>

        </Grid.Row>
      </Grid>
    </Segment>
  )
}
export default UnauthComponent