import { OrderByDirection, WhereFilterOp } from "firebase/firestore"

export type CollectionOptions = {
  queries?: QueryOptions[]
  sort?: SortOptions
}

type QueryOptions = {
  attribute: string,
  operator: WhereFilterOp
  value: string | number | boolean | Date | any[]
}

type SortOptions = {
  attribute: string
  order: OrderByDirection
}