import {
  Column,
  CreateDateColumn,
  Entity,
  Index, JoinColumn, JoinTable, ManyToMany,
  ManyToOne, OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from "typeorm";

import {User} from "../../user/entities/user.entity";
import {PostStatus} from "./enumeration/post-status.enumeration";
import { Visibility } from "./enumeration/visibility.enumeration";
import {PostMeta} from "./post-meta.entity";
import {Tag} from "./tags.entity";

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 256})
  title: string;

  @Index()
  @Unique('slug', ['slug'])
  @Column({ length: 191, nullable: false })
  slug: string;

  @Column({ type: 'longtext', nullable: true})
  mobileDoc: string;

  @Column({ type: 'longtext', nullable: true})
  html: string;

  @Column({ type: 'longtext', nullable: true})
  plaintext: string;

  @Column({ nullable: true})
  featureImg: string;

  @Column({ default: false })
  featured: boolean;

  @Column({ length: 256})
  status: PostStatus;

  @Column({ length: 6, nullable: true })
  locale: string;

  @Column({ default: 'PUBLIC', nullable: false })
  visibility: Visibility;
  
  @ManyToOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_type) => User,
      user => user.authoredPosts,
    { eager: true })
  author: User;

  @CreateDateColumn({ name: 'createdAt', nullable: true })
  createdAt: Date;

  @ManyToOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_type) => User,
    user => user.createdPosts,
    { eager: false })
  createdBy: User;

  @UpdateDateColumn({ name: 'updatedAt', nullable: true })
  updatedAt: Date;

  @ManyToOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_type) => User,
    user => user.updatedPosts,
    { eager: false })
  updatedBy: User;

  @Column({ type: 'datetime', nullable: true })
  publishedAt: Date;

  @ManyToOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_type) => User,
    user => user.publishedPosts,
    { eager: false })
  publishedBy: string;

  @Column({nullable: true})
  customExcerpt: string;

  @Column({nullable: true})
  canonicalUrl: string;

  @OneToOne(() => PostMeta, {cascade: ['remove']})
  @JoinColumn()
  meta: PostMeta;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @ManyToMany(() => User)
  @JoinTable()
  authors: User[];
}