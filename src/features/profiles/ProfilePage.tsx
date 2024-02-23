import { Grid, Segment } from "semantic-ui-react"
import ProfileHeader from "./ProfileHeader"
import ProfileContent from "./ProfileContent"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../../app/store/store"
import { useFireStore } from "../../app/hooks/firestore/useFirestore"
import { useEffect } from "react"
import { actions } from "./profileSlice"
import LoadingComponent from "../../app/layout/LoadingComponent"

const ProfilePage = () => {

  const { id } = useParams()

  const { status, data } = useAppSelector(state => state.profiles)

  const profile = data.find((p) => p.id === id)

  const { loadDocument } = useFireStore("profiles")


  useEffect(() => {
    if (id) {
      loadDocument(id, actions)
    }
  }, [id, loadDocument])

  if (status === "loading") {
    return <LoadingComponent content="Loading profile..." />
  }

  if (!profile) {
    return <h1>Profile not found</h1>
  }

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader profile={profile} />
        <ProfileContent />
      </Grid.Column>
    </Grid>
  )
}
export default ProfilePage