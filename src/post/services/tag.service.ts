import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {plainToClass} from "class-transformer";

import {AppLogger} from "../../shared/logger/logger.service";
import {RequestContext} from "../../shared/request-context/request-context.dto";
import {TagOutput} from "../dtos/tag-output.dto";
import {TagRepository} from "../repositories/tag.repository";

@Injectable()
export class TagService {
  constructor(@InjectRepository(TagRepository) private tagRepository: TagRepository, private readonly logger: AppLogger) {
    this.logger.setContext(TagService.name);
  }

  async getTags(
    ctx: RequestContext,
    limit: number,
    offset: number,
  ): Promise<{ tags: TagOutput[]; count: number }> {
    this.logger.log(ctx, `${this.getTags.name} was called`);

    this.logger.log(ctx, `calling ${TagRepository.name}.findAndCount`);
    const [tags, count] = await this.tagRepository.findAndCount({
      where: {},
      take: limit,
      skip: offset,
    });

    const tagsOutput = plainToClass(TagOutput, tags, {
      excludeExtraneousValues: true,
    });

    return { tags: tagsOutput, count };
  }

  async findById(ctx: RequestContext, id: string): Promise<TagOutput> {
    this.logger.log(ctx, `${this.findById.name} was called`);

    this.logger.log(ctx, `calling ${TagRepository.name}.findOne`);
    const post = await this.tagRepository.findOne(id);

    return plainToClass(TagOutput, post, {
      excludeExtraneousValues: true,
    });
  }

  async findBySlug(
    ctx: RequestContext,
    slug: string,
  ): Promise<TagOutput> {
    this.logger.log(ctx, `${this.findBySlug.name} was called`);

    this.logger.log(ctx, `calling ${TagRepository.name}.findOne`);
    const tag = await this.tagRepository.findOne({ slug });

    return plainToClass(TagOutput, tag, {
      excludeExtraneousValues: true,
    });
  }
}
