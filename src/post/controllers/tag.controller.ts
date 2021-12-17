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
import {TagOutput} from "../dtos/tag-output.dto";
import {TagService} from "../services/tag.service";

@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor(
    private readonly tagService: TagService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(TagController.name);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOperation({
    summary: 'Get Tags as a list API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([TagOutput]),
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: BaseApiErrorResponse,
  })
  @UseGuards(JwtAuthGuard, AuthorityGuard)
  @Authorities(AUTHORITIES.ADMIN, AUTHORITIES.USER)
  async getTags(
    @ReqContext() ctx: RequestContext,
    @Query() query: PaginationParamsDto,
  ): Promise<BaseApiResponse<TagOutput[]>> {
    this.logger.log(ctx, `${this.getTags.name} was called`);

    const { tags, count } = await this.tagService.getTags(
      ctx,
      query.limit,
      query.offset,
    );

    return { data: tags, meta: { count } };
  }

  // TODO: ADD AuthorityGuard
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiOperation({
    summary: 'Get Tag by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(TagOutput),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  async getTag(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: string,
  ): Promise<BaseApiResponse<TagOutput>> {
    this.logger.log(ctx, `${this.getTag.name} was called`);

    const tag = await this.tagService.findById(ctx, id);
    return { data: tag, meta: {} };
  }

  // TODO: ADD AuthorityGuard
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':slug')
  @ApiOperation({
    summary: 'Get Tag by slug API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(TagOutput),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  async getTagBySlug(
    @ReqContext() ctx: RequestContext,
    @Param('slug') slug: string,
  ): Promise<BaseApiResponse<TagOutput>> {
    this.logger.log(ctx, `${this.getTagBySlug.name} was called`);

    const post = await this.tagService.findBySlug(ctx, slug);
    return { data: post, meta: {} };
  }
}
