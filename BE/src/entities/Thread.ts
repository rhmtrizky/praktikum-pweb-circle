import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../entities/User';
import { Like } from './Like';
import { Reply } from './Reply';
import { Follow } from './Follow';

@Entity({ name: 'threads' })
export class Thread {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  posted_at: Date;

  @ManyToOne(() => User, (user) => user.threads, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Like, (like) => like.thread, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  likes: Like[];

  @OneToMany(() => Reply, (like) => like.thread, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  replies: Reply[];
}
