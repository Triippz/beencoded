import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

import {User} from "../../user/entities/user.entity";
import {Visibility} from "../entities/enumeration/visibility.enumeration";
import {Tag} from "../entities/tags.entity";

export class TagOutput {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  slug: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  featureImage: number;

  @Expose()
  @ApiProperty()
  parentTag: Tag;

  @Expose()
  @ApiProperty()
  childrenTags: Tag[];

  @Expose()
  @ApiProperty()
  visibility: Visibility;

  @Expose()
  @ApiProperty()
  ogImage: string;

  @Expose()
  @ApiProperty()
  ogTitle: string;

  @Expose()
  @ApiProperty()
  ogDescription: string;

  @Expose()
  @ApiProperty()
  twitterImage: string;

  @Expose()
  @ApiProperty()
  twitterTitle: string;

  @Expose()
  @ApiProperty()
  twitterDescription: string;

  @Expose()
  @ApiProperty()
  metaTitle: string;

  @Expose()
  @ApiProperty()
  metaDescription: string;

  @Expose()
  @ApiProperty()
  canonicalUrl: string;

  @Expose()
  @ApiProperty()
  accentColor: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  createdBy: User;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @ApiProperty()
  updatedBy: User;
}