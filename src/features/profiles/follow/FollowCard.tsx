import { Card, Image } from "semantic-ui-react"
import { Profile } from "../../../app/types/profile"
import { Link } from "react-router-dom"

type Props = {
  profile: Partial<Profile>
}

const FollowCard = ({ profile }: Props) => {
  return (
    <Card as={Link} to={`/profiles/${profile.id}`}>
      <Image src={profile.photoURL || "/assets/user.png"} />
      <Card.Content>
        <Card.Header>
          {profile.displayName}
        </Card.Header>
      </Card.Content>
    </Card>
  )
}
export default FollowCard