import {NotFoundException} from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";

import {Post} from "../entities/post.entity";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async getById(id: string): Promise<Post> {
    const post = await this.findOne(id);
    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }
}