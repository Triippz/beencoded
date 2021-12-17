import {NotFoundException} from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";

import {PostMeta} from "../entities/post-meta.entity";

@EntityRepository(PostMeta)
export class PostMetaRepository extends Repository<PostMeta> {
  async getById(id: string): Promise<PostMeta> {
    const postMeta = await this.findOne(id);
    if (!postMeta) {
      throw new NotFoundException();
    }

    return postMeta;
  }
}