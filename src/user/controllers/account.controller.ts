import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {BaseApiResponse, SwaggerBaseApiResponse} from "../../shared/dtos/base-api-response.dto";
import {AppLogger} from "../../shared/logger/logger.service";
import {ReqContext} from "../../shared/request-context/req-context.decorator";
import {RequestContext} from "../../shared/request-context/request-context.dto";
import {ChangePasswordDTO} from "../dtos/account-change-password-input.dto";
import {KeyAndPasswordVM} from "../dtos/account-key-and-password-input.dto";
import {AccountMessageOutput} from "../dtos/account-message-output";
import {PasswordResetDTO} from "../dtos/account-password-reset-input.dto";
import {UserService} from "../services/user.service";

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(AccountController.name);
  }

  @Post('change-password')
  @ApiOperation({
    summary: 'Change Password API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(AccountMessageOutput),
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: SwaggerBaseApiResponse(AccountMessageOutput),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @ReqContext() ctx: RequestContext,
    @Body() changePasswordDTO: ChangePasswordDTO,
  ): Promise<BaseApiResponse<AccountMessageOutput>> {
    const message = await this.userService.changePassword(ctx, changePasswordDTO);
    return {data: message, meta: {}};
  }

  @Post('reset-password/init')
  @ApiOperation({
    summary: 'Password Reset Request API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(AccountMessageOutput),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async requestPasswordReset(
    @ReqContext() ctx: RequestContext,
    @Body() passwordResetDTO: PasswordResetDTO,
  ): Promise<BaseApiResponse<AccountMessageOutput>> {
    const message = await this.userService.requestPasswordReset(ctx, passwordResetDTO);
    return {data: message, meta: {}};
  }

  @Post('reset-password/finish')
  @ApiOperation({
    summary: 'Password Reset Finish API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(AccountMessageOutput),
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: SwaggerBaseApiResponse(AccountMessageOutput),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async finishPasswordReset(
    @ReqContext() ctx: RequestContext,
    @Body() keyAndPasswordVM: KeyAndPasswordVM,
  ): Promise<BaseApiResponse<AccountMessageOutput>> {
    const message = await this.userService.completePasswordReset(ctx, keyAndPasswordVM);
    return {data: message, meta: {}};
  }
}