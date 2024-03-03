export type Profile = {
  id: string
  displayName: string
  photoUrl: string
  createdAt: string
  description: string
  followerCount?: number
  followingCount?: number
}

export type Photo = {
  id: string
  name: string
  url: string
}

export type Follow = {
  id: string
  displayName: string
  photoURL: string
}