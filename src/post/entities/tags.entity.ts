import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from "typeorm";

import {User} from "../../user/entities/user.entity";
import { Visibility } from "./enumeration/visibility.enumeration";

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Unique('name', ['name'])
  @Column({ length: 191, nullable: false })
  name: string;

  @Index()
  @Unique('slug', ['slug'])
  @Column({ length: 191, nullable: false })
  slug: string;

  @Column({ type: 'longtext', nullable: true})
  description: string;

  @Column({nullable: true})
  featureImage: string;

  @ManyToOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_type) => Tag,
    { eager: false })
  parentTag: Tag;

  @OneToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_type) => Tag,
    tag => tag.name,
    { eager: false }
  )
  childrenTags: Tag[];

  @Column({ default: 'PUBLIC', nullable: false })
  visibility: Visibility;

  @Column({nullable: true})
  ogImage: string;

  @Column({nullable: true})
  ogTitle: string;

  @Column({nullable: true})
  ogDescription: string;

  @Column({nullable: true})
  twitterImage: string;

  @Column({nullable: true})
  twitterTitle: string;

  @Column({nullable: true})
  twitterDescription: string;

  @Column({nullable: true})
  metaTitle: string;

  @Column({nullable: true})
  metaDescription: string;

  @Column({nullable: true})
  canonicalUrl: string;

  @Column({nullable: true})
  accentColor: string;

  @CreateDateColumn({ name: 'createdAt', nullable: true })
  createdAt: Date;

  @ManyToOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_type) => User,
    { eager: false })
  createdBy: User;

  @UpdateDateColumn({ name: 'updatedAt', nullable: true })
  updatedAt: Date;

  @ManyToOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_type) => User,
    { eager: false })
  updatedBy: User;
}