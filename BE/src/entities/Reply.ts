import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { User } from './User'
import { Thread } from "./Thread"

@Entity({name : "replies"})
export class Reply {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column({type: "timestamp" , default: () => "CURRENT_TIMESTAMP"})
    posted_at: Date

    @ManyToOne(() => User, (user) => user.replies, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    user: User

    @ManyToOne(() => Thread, (thread) => thread.replies, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    thread: Thread
}