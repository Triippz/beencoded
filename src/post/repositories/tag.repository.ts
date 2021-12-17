import {NotFoundException} from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";

import {Tag} from "../entities/tags.entity";

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  async getById(id: string): Promise<Tag> {
    const tag = await this.findOne(id);
    if (!tag) {
      throw new NotFoundException();
    }

    return tag;
  }
}