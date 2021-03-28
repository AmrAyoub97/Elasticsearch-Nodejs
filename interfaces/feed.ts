export interface conversation {
  id: number
  text: string
  user_gender: "male" | "female" | "virtual"
  lang: "ar" | "en"
  dialect: "eg" | "gf" | "std"
  user: {
    id: number
    followers_count: number
  }
}
