import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from "semantic-ui-react"
import { Profile } from "../../app/types/profile"
import { useFireStore } from "../../app/hooks/firestore/useFirestore"
import { auth } from "../../app/config/firebase"
import { increment } from "firebase/firestore"


type Props = {
  profile: Profile
}
const ProfileHeader = ({ profile }: Props) => {

  const { update } = useFireStore("profiles");
  // берем профиль из коллекции по id профиля чтобы увеличить ему followerCount
  // set для обновления подколлекции
  const { set: setFollower, remove: removeFollower } = useFireStore(`profiles/${profile.id}/followers`)


  // а здесь берем id автоирзованного usera и увеличиваем его followingCount ( нас увеличивается кол-во подиписок)
  // set для обновления подколлекции
  const { set: setFollowing, remove: removeFollowing } = useFireStore(`profiles/${auth.currentUser?.uid}/following`)



  async function handleFollowToggle(follow: boolean) {
    if (!profile.id || !auth.currentUser?.uid) {
      return
    }
    if (follow) {
      await update(auth.currentUser.uid, {
        followingCount: increment(1)
      })
      await update(profile.id, {
        followerCount: increment(1)
      })

      await setFollowing(profile.id, {
        displayName: profile.displayName,
        photoURL: profile.photoUrl
      })
      await setFollower(auth.currentUser.uid, {
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL
      })
    } else {
      await update(auth.currentUser.uid, {
        followingCount: increment(-1)
      })
      await update(profile.id, {
        followerCount: increment(-1)
      })

      await removeFollowing(profile.id)
      await removeFollower(auth.currentUser.uid)
    }
  }


  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image avatar size="small" src={profile.photoUrl || "/user.png"} />
              <Item.Content verticalAlign="middle">
                <Header as="h1" style={{ display: "block", marginBottom: 10 }} content={profile.displayName} />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group>
            <Statistic label="Followers" value={profile.followerCount || 0} />
            <Statistic label="Following" value={profile.followingCount || 0} />
          </Statistic.Group>
          <Divider />
          <Button onClick={() => handleFollowToggle(true)} color="teal" content="Follow" />
          <Button onClick={() => handleFollowToggle(false)} color="red" content="Unfollow" />
          {/* <Reveal animated="move">
            <Reveal.Content visible style={{ width: "100%" }}>
              <Button fluid color="teal" content="Following" />
            </Reveal.Content>
            <Reveal.Content hidden style={{ width: "100%" }}>
              <Button basic fluid color="red" content="Unfollow" />
            </Reveal.Content>
          </Reveal> */}
        </Grid.Column>
      </Grid>
    </Segment>
  )
}
export default ProfileHeader