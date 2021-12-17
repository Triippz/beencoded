import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

import {ProfileVisibility} from "./enum/profile-visibility";

@Entity('user_profile')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256, nullable: true, name: 'cover_image'})
  coverImage: string;

  @Column({ type: 'longtext', nullable: true})
  bio: string;

  @Column({ length: 256, nullable: true})
  website: string;

  @Column({ length: 256, nullable: true})
  facebook: string;

  @Column({ length: 256, nullable: true})
  twitter: string;

  @Column({ length: 256, nullable: true})
  linkedin: string;

  @Column({ length: 256, default: "PUBLIC"})
  visibility: ProfileVisibility
}