import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {plainToClass} from "class-transformer";

import {AppLogger} from "../../shared/logger/logger.service";
import {RequestContext} from "../../shared/request-context/request-context.dto";
import {PostOutput} from "../dtos/post.output";
import {PostRepository} from "../repositories/post.repository";

@Injectable()
export class PostService {
  constructor(@InjectRepository(PostRepository) private postRepository: PostRepository, private readonly logger: AppLogger) {
    this.logger.setContext(PostService.name);
  }

  async getPosts(
    ctx: RequestContext,
    limit: number,
    offset: number,
  ): Promise<{ posts: PostOutput[]; count: number }> {
    this.logger.log(ctx, `${this.getPosts.name} was called`);

    this.logger.log(ctx, `calling ${PostRepository.name}.findAndCount`);
    const [posts, count] = await this.postRepository.findAndCount({
      where: {},
      take: limit,
      skip: offset,
    });

    const postsOutput = plainToClass(PostOutput, posts, {
      excludeExtraneousValues: true,
    });

    return { posts: postsOutput, count };
  }
  
  async findById(ctx: RequestContext, id: string): Promise<PostOutput> {
    this.logger.log(ctx, `${this.findById.name} was called`);

    this.logger.log(ctx, `calling ${PostRepository.name}.findOne`);
    const post = await this.postRepository.findOne(id);

    return plainToClass(PostOutput, post, {
      excludeExtraneousValues: true,
    });
  }

  async findBySlug(
    ctx: RequestContext,
    slug: string,
  ): Promise<PostOutput> {
    this.logger.log(ctx, `${this.findBySlug.name} was called`);

    this.logger.log(ctx, `calling ${PostRepository.name}.findOne`);
    const post = await this.postRepository.findOne({ slug });

    return plainToClass(PostOutput, post, {
      excludeExtraneousValues: true,
    });
  }
  
}
