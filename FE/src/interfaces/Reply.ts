import { IUser } from "./User";


export interface IReply {
    id?: number,
    content?: string,
    user?: IUser
}

export interface IReplyPost {
    content?: string,
    thread_id?: number,
    posted_at?: Date
}