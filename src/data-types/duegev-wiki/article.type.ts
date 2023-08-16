import { UserData } from "../authentication/user-data"

export type WikiArticle = {
    _id: number,
    article_id: string,
    title: string,
    date: number,
    author: UserData['uid'] | number,
    irl_date: string
    labels: string[],
    categories: string[],
    document: string,
    likes: UserData['uid'][] | number[]
}