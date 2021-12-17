import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";

import {AppLogger} from "../../shared/logger/logger.service";
import {PostMetaRepository} from "../repositories/post-meta.repository";

@Injectable()
export class PostMetaService {
  constructor(@InjectRepository(PostMetaRepository) private postMetaRepository: PostMetaRepository, private readonly logger: AppLogger) {
    this.logger.setContext(PostMetaService.name);
  }
}
