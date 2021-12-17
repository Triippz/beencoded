import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus, Param,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

import {AUTHORITIES} from "../../auth/constants/authority.constant";
import {Authorities} from "../../auth/decorators/authority.decorator";
import {AuthorityGuard} from "../../auth/guards/authority.guard";
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {BaseApiErrorResponse, BaseApiResponse, SwaggerBaseApiResponse} from "../../shared/dtos/base-api-response.dto";
import {PaginationParamsDto} from "../../shared/dtos/pagination-params.dto";
import {AppLogger} from "../../shared/logger/logger.service";
import {ReqContext} from "../../shared/request-context/req-context.decorator";
import {RequestContext} from "../../shared/request-context/request-context.dto";
import {UserOutput} from "../../user/dtos/user-output.dto";
import {PostOutput} from "../dtos/post.output";
import {PostService} from "../services/post.service";

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(PostController.name);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOperation({
    summary: 'Get Posts as a list API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([UserOutput]),
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: BaseApiErrorResponse,
  })
  @UseGuards(JwtAuthGuard, AuthorityGuard)
  @Authorities(AUTHORITIES.ADMIN, AUTHORITIES.USER)
  async getPosts(
    @ReqContext() ctx: RequestContext,
    @Query() query: PaginationParamsDto,
  ): Promise<BaseApiResponse<PostOutput[]>> {
    this.logger.log(ctx, `${this.getPosts.name} was called`);

    const { posts, count } = await this.postService.getPosts(
      ctx,
      query.limit,
      query.offset,
    );

    return { data: posts, meta: { count } };
  }

  // TODO: ADD AuthorityGuard
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiOperation({
    summary: 'Get Post by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(PostOutput),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  async getPost(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: string,
  ): Promise<BaseApiResponse<PostOutput>> {
    this.logger.log(ctx, `${this.getPost.name} was called`);

    const post = await this.postService.findById(ctx, id);
    return { data: post, meta: {} };
  }

  // TODO: ADD AuthorityGuard
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':slug')
  @ApiOperation({
    summary: 'Get Post by slug API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(PostOutput),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  async getPostBySlug(
    @ReqContext() ctx: RequestContext,
    @Param('slug') slug: string,
  ): Promise<BaseApiResponse<PostOutput>> {
    this.logger.log(ctx, `${this.getPost.name} was called`);

    const post = await this.postService.findBySlug(ctx, slug);
    return { data: post, meta: {} };
  }
}
