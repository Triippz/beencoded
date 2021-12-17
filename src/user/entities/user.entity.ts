import {Exclude} from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity, Index, JoinColumn, JoinTable, ManyToMany,
  OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import {Post} from "../../post/entities/post.entity";
import {UserProfile} from "./user-profile.entity";


@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, name: 'first_name' })
  firstName: string;

  @Column({ length: 100, name: 'last_name' })
  lastName: string;

  @Column()
  password: string;

  @Index()
  @Unique('slug', ['slug'])
  @Column({ length: 191 })
  slug: string;

  @Index()
  @Unique('username', ['username'])
  @Column({ length: 200 })
  username: string;

  @Column('simple-array')
  authorities: string[];

  @Column({ default: true, nullable: false, name: 'is_account_disabled' })
  isAccountDisabled: boolean;

  @Index()
  @Unique('email', ['email'])
  @Column({ length: 200 })
  email: string;

  @Column({ length: 256, nullable: true, name: 'profile_image' })
  profileImage?: string;

  @Column({length: 6, nullable: true})
  locale?: string;

  @Column({ type: 'datetime', nullable: true, name: 'last_seen_at' })
  lastSeenAt?: Date;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt?: Date;

  @OneToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_type) => User,
    user => user.username,
    { eager: false }
  )
  createdBy?: User;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @OneToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_type) => User,
    user => user.username,
    { eager: false }
  )
  updatedBy?: User;

  @Column({ length: 36, nullable: true, name: 'activation_key' })
  @Unique('activationKey', ['activationKey'])
  activationKey?: string;

  @Column({ length: 36, nullable: true, name: 'reset_key' })
  @Unique('resetKey', ['resetKey'])
  resetKey?: string;

  @Column({ type: 'datetime', nullable: true, name: 'reset_date' })
  resetDate?: Date;

  @OneToOne(() => UserProfile, {cascade: ['insert', 'remove']})
  @JoinColumn({name: 'profile_id'})
  profile?: UserProfile;

  @OneToMany(() => Post, post => post.updatedBy)
  @Exclude({ toPlainOnly: true })
  updatedPosts?: Post[];

  @OneToMany(() => Post, post => post.createdBy)
  @Exclude({ toPlainOnly: true })
  createdPosts?: Post[];

  @OneToMany(() => Post, post => post.publishedBy)
  @Exclude({ toPlainOnly: true })
  publishedPosts?: Post[];

  @OneToMany(() => Post, post => post.author)
  @Exclude({ toPlainOnly: true })
  authoredPosts?: Post[];

}
