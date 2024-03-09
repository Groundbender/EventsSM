import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react"
import { Photo, Profile } from "../../app/types/profile"
import { useEffect, useState } from "react"
import { auth, storage } from "../../app/config/firebase"
import PhotoUpload from "./PhotoUpload"
import { useAppSelector } from "../../app/store/store"
import { useFireStore } from "../../app/hooks/firestore/useFirestore"
import { actions } from "./photosSlice"
import { updateProfile } from "firebase/auth"
import { deleteObject, ref } from "firebase/storage"
import { toast } from "react-toastify"
import { batchSetPhoto } from "../../app/actions/firestoreActions"

type Props = {
  profile: Profile
}
const ProfilePhotos = ({ profile }: Props) => {
  const [editMode, setEditMode] = useState(false);

  const isCurrentUser = auth.currentUser?.uid === profile.id;
  const { data: photos, status } = useAppSelector(state => state.photos)
  const { loadCollection, remove } = useFireStore(`profiles/${profile.id}/photos`);
  const { update } = useFireStore("profiles");

  useEffect(() => {
    loadCollection(actions)
  }, [loadCollection])

  async function handleSetMain(photo: Photo) {
    await batchSetPhoto(photo.url)
    // // для коллекции
    // await update(profile.id, {
    //   photoURL: photo.url
    // })
    // // для профиля из firebase auth
    // await updateProfile(auth.currentUser!, {
    //   photoURL: photo.url
    // })
  }

  async function handleDeletePhoto(photo: Photo) {
    try {
      const storageRef = ref(storage, `${profile.id}/user_images/${photo.id}`);
      await deleteObject(storageRef);
      await remove(photo.id)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <Tab.Pane loading={status === "loading"}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content="Photos" />
          {isCurrentUser &&

            <Button onClick={() => setEditMode(!editMode)} floated="right" content={editMode ? "Cancel" : "Add Photo"} basic />

          }
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? <PhotoUpload profile={profile} setEditMode={setEditMode} /> : (
            <Card.Group itemsPerRow={5}>
              {photos.map(photo => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  {isCurrentUser && (
                    <Button.Group>
                      <Button disabled={photo.url === profile.photoURL} onClick={() => handleSetMain(photo)} basic color="green" >Main</Button>
                      <Button disabled={photo.url === profile.photoURL} onClick={() => handleDeletePhoto(photo)} basic color="red" icon="trash" />
                    </Button.Group>
                  )}

                </Card>
              ))}

            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}
export default ProfilePhotos