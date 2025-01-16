import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Thread } from '../entities/Thread';
import { Like } from './Like';
import { Reply } from './Reply';
import { Follow } from './Follow';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  full_name: string;

  @Column({ select: false })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Thread, (thread) => thread.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  threads: Thread[];
  @OneToMany(() => Thread, (thread) => thread.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  likes: Like[];

  @OneToMany(() => Follow, (follow) => follow.follower, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  followers: Follow[];

  @OneToMany(() => Follow, (follow) => follow.followed, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  followings: Follow[];

  @OneToMany(() => Reply, (reply) => reply.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  replies: Reply[];
}
