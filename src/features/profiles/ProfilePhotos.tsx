import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react"
import { Profile } from "../../app/types/profile"
import { useState } from "react"
import { auth } from "../../app/config/firebase"
import PhotoUpload from "./PhotoUpload"

type Props = {
  profile: Profile
}
const ProfilePhotos = ({ profile }: Props) => {
  const [editMode, setEditMode] = useState(false);

  const isCurrentUser = auth.currentUser?.uid === profile.id;

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content="Photos" />
          {isCurrentUser &&

            <Button onClick={() => setEditMode(!editMode)} floated="right" content={editMode ? "Cancel" : "Add Photo"} basic />

          }
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? <PhotoUpload /> : (
            <Card.Group itemsPerRow={5}>
              <Card>
                <Image src="/user.png" />
                {isCurrentUser && (
                  <Button.Group>
                    <Button basic color="green" >Main</Button>
                    <Button basic color="red" icon="trash" />
                  </Button.Group>
                )}

              </Card>
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}
export default ProfilePhotos