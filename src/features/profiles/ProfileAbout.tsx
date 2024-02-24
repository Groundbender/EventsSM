import { Button, Grid, Header, Tab } from "semantic-ui-react"
import { Profile } from "../../app/types/profile"
import { useState } from "react"
import ProfileForm from "./ProfileForm"
import { auth } from "../../app/config/firebase"


type Props = {
  profile: Profile
}

const ProfileAbout = ({ profile }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const isCurrentUser = auth.currentUser?.uid === profile.id;

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content={`About ${profile.displayName}`} />
          {isCurrentUser && <Button onClick={() => setEditMode(!editMode)} floated="right" content={editMode ? "Cancel" : "Edit Profile"} basic />}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? <ProfileForm profile={profile} setEditMode={setEditMode} /> : (
            <>
              <div style={{ marginTop: 10 }}>
                <strong>Member since: {profile.createdAt}</strong>
                <div style={{ marginTop: 10 }}>{profile.description}</div>
              </div>
            </>

          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}
export default ProfileAbout