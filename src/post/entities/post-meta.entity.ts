import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('post_meta')
export class PostMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  ogImage: string;

  @Column({type: 'longtext', nullable: true})
  ogDescription: string;

  @Column({nullable: true})
  ogTitle: string;

  @Column({nullable: true})
  twitterImage: string;

  @Column({nullable: true})
  twitterDescription: string;

  @Column({nullable: true})
  twitterTitle: string;

  @Column({nullable: true})
  metaTitle: string;

  @Column({nullable: true})
  metaDescription: string;

  @Column({nullable: true})
  emailSubject: string;

  @Column({ type: 'longtext', nullable: true })
  frontMatter: string;

  @Column({nullable: true})
  featureImageAlt: string;

  @Column({nullable: true})
  featureImageCaption: string;

  @Column({default: false})
  emailOnly: boolean;
}