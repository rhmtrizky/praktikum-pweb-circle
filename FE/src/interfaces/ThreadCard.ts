import { IUser } from "./User"

export interface IThreadCard {
    id: number,
    author_picture? : String,
    author_full_name?: String,
    author_username?: String,
    user: IUser,
    posted_at?: Date,
    content?: String,
    likes_count: number,
    replies_count: number,
    is_liked: boolean,
    image?: string
}