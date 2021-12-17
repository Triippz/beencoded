import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

import {User} from "../../user/entities/user.entity";
import {PostStatus} from "../entities/enumeration/post-status.enumeration";
import {Visibility} from "../entities/enumeration/visibility.enumeration";
import {PostMeta} from "../entities/post-meta.entity";
import {Tag} from "../entities/tags.entity";

export class PostOutput {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  slug: string;

  @Expose()
  @ApiProperty()
  mobileDoc: string;

  @Expose()
  @ApiProperty()
  html: string;

  @Expose()
  @ApiProperty()
  plaintext: string;

  @Expose()
  @ApiProperty()
  featureImg: string;

  @Expose()
  @ApiProperty()
  featured: boolean;

  @Expose()
  @ApiProperty({ example: PostStatus.PUBLISHED })
  status: PostStatus;

  @Expose()
  @ApiProperty()
  locale: string;

  @Expose()
  @ApiProperty({ example: Visibility.PUBLIC })
  visibility: Visibility;

  @Expose()
  @ApiProperty({ example: { id: 'e45ce87a-b235-4058-ae78-b7d03adf89ab'}})
  author: User;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty({ example: { id: 'e45ce87a-b235-4058-ae78-b7d03adf89ab'}})
  createdBy: User;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @ApiProperty({ example: { id: 'e45ce87a-b235-4058-ae78-b7d03adf89ab'}})
  updatedBy: User;

  @Expose()
  @ApiProperty()
  publishedAt: Date;

  @Expose()
  @ApiProperty()
  publishedBy: string;

  @Expose()
  @ApiProperty()
  customExcerpt: string;

  @Expose()
  @ApiProperty()
  canonicalUrl: string;

  @Expose()
  @ApiProperty()
  meta: PostMeta;

  @Expose()
  @ApiProperty()
  tags: Tag[];

  @Expose()
  @ApiProperty({ example: [{ id: 'e45ce87a-b235-4058-ae78-b7d03adf89ab'}]})
  authors: User[];
}