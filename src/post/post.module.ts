import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {SharedModule} from "../shared/shared.module";
import {UserModule} from "../user/user.module";
import { PostController } from './controllers/post.controller';
import {PostMetaController} from "./controllers/post-meta.controller";
import {TagController} from "./controllers/tag.controller";
import {PostRepository} from "./repositories/post.repository";
import {PostMetaRepository} from "./repositories/post-meta.repository";
import {TagRepository} from "./repositories/tag.repository";
import { PostService } from './services/post.service';
import {PostMetaService} from "./services/post-meta.service";
import {TagService} from "./services/tag.service";

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([PostRepository, PostMetaRepository, TagRepository]), UserModule],
  providers: [PostService, PostMetaService, TagService],
  controllers: [PostController, PostMetaController, TagController]
})
export class PostModule {}
