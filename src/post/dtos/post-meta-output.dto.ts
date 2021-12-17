import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class PostMetaOutputDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  ogImage: string;

  @Expose()
  @ApiProperty()
  ogDescription: string;

  @Expose()
  @ApiProperty()
  ogTitle: string;

  @Expose()
  @ApiProperty()
  twitterImage: string;

  @Expose()
  @ApiProperty()
  twitterDescription: string;

  @Expose()
  @ApiProperty()
  twitterTitle: string;

  @Expose()
  @ApiProperty()
  metaTitle: string;

  @Expose()
  @ApiProperty()
  metaDescription: string;

  @Expose()
  @ApiProperty()
  emailSubject: string;

  @Expose()
  @ApiProperty()
  frontMatter: string;

  @Expose()
  @ApiProperty()
  featureImageAlt: string;

  @Expose()
  @ApiProperty()
  featureImageCaption: string;

  @Expose()
  @ApiProperty()
  emailOnly: boolean;
}