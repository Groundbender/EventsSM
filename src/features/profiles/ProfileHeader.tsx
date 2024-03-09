import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from "semantic-ui-react"
import { Profile } from "../../app/types/profile"
import { useFireStore } from "../../app/hooks/firestore/useFirestore"
import { auth, db } from "../../app/config/firebase"
import { doc, getDoc, increment } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/store/store"
import { actions } from "./profileSlice"
import { toast } from "react-toastify"
import { batchedFollowToggle } from "../../app/actions/firestoreActions"


type Props = {
  profile: Profile
}
const ProfileHeader = ({ profile }: Props) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector(state => state.auth)
  // const { update } = useFireStore("profiles");
  // берем профиль из коллекции по id профиля чтобы увеличить ему followerCount
  // set для обновления подколлекции
  // const { set: setFollower, remove: removeFollower } = useFireStore(`profiles/${profile.id}/followers`)


  // а здесь берем id автоирзованного usera и увеличиваем его followingCount ( нас увеличивается кол-во подиписок)
  // set для обновления подколлекции
  // const { set: setFollowing, remove: removeFollowing } = useFireStore(`profiles/${auth.currentUser?.uid}/following`)

  useEffect(() => {
    const docRef = doc(db, `profiles/${profile.id}/followers/${auth.currentUser?.uid}`)
    getDoc(docRef).then((docSnap) => {
      console.log(docSnap);
      console.log(docSnap.exists());

      dispatch(actions.setFollowing({ id: profile.id, isFollowing: docSnap.exists() }))
    })
  }, [dispatch, profile.id])


  async function handleFollowToggle(follow: boolean) {
    if (!profile.id || !auth.currentUser?.uid) {
      return
    }

    setLoading(true)

    try {
      await batchedFollowToggle(profile, follow)
      dispatch(actions.setFollowing({ id: profile.id, isFollowing: follow }))
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  // async function handleFollowToggle(follow: boolean) {
  //   if (!profile.id || !auth.currentUser?.uid) {
  //     return
  //   }

  //   setLoading(true)

  //   if (follow) {
  //     await update(auth.currentUser.uid, {
  //       followingCount: increment(1)
  //     })
  //     await update(profile.id, {
  //       followerCount: increment(1)
  //     })

  //     await setFollowing(profile.id, {
  //       displayName: profile.displayName,
  //       photoURL: profile.photoURL
  //     })
  //     await setFollower(auth.currentUser.uid, {
  //       displayName: auth.currentUser.displayName,
  //       photoURL: auth.currentUser.photoURL
  //     })
  //   } else {
  //     await update(auth.currentUser.uid, {
  //       followingCount: increment(-1)
  //     })
  //     await update(profile.id, {
  //       followerCount: increment(-1)
  //     })

  //     await removeFollowing(profile.id)
  //     await removeFollower(auth.currentUser.uid)
  //   }
  //   dispatch(actions.setFollowing({ id: profile.id, isFollowing: follow }))
  //   setLoading(false)
  // }


  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image avatar size="small" src={profile.photoURL || "/user.png"} />
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
          {currentUser?.uid !== profile.id && (
            <>
              <Divider />

              <Reveal animated="move">
                <Reveal.Content visible style={{ width: "100%" }}>
                  <Button fluid color="teal" content={profile.isFollowing ? "Following" : "Not following"} />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: "100%" }}>
                  <Button
                    basic
                    fluid
                    color={profile.isFollowing ? "red" : "green"}

                    content={profile.isFollowing ? "Unfollow" : "Follow"}
                    onClick={() => handleFollowToggle(!profile.isFollowing)}
                    loading={loading}

                  />
                </Reveal.Content>
              </Reveal>
            </>
          )}


        </Grid.Column>
      </Grid>
    </Segment>
  )
}
export default ProfileHeader