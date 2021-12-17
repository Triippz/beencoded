import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {compare, hash} from 'bcrypt';
import {plainToClass} from 'class-transformer';
import { uuid } from 'uuidv4';

import {MailService} from "../../mail/mail.service";
import {BaseApiException} from "../../shared/exceptions/base-api.exception";
import {AppLogger} from '../../shared/logger/logger.service';
import {SlugProvider} from "../../shared/providers/slug.provider";
import {RequestContext} from '../../shared/request-context/request-context.dto';
import {ChangePasswordDTO} from "../dtos/account-change-password-input.dto";
import {KeyAndPasswordVM} from "../dtos/account-key-and-password-input.dto";
import {AccountMessageOutput} from "../dtos/account-message-output";
import {PasswordResetDTO} from "../dtos/account-password-reset-input.dto";
import {CreateUserInput} from '../dtos/user-create-input.dto';
import {UserOutput} from '../dtos/user-output.dto';
import {UpdateUserInput} from '../dtos/user-update-input.dto';
import {User} from '../entities/user.entity';
import {UserRepository} from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private repository: UserRepository,
    private readonly logger: AppLogger,
    private mailService: MailService,
    private slugProvider: SlugProvider,
  ) {
    this.logger.setContext(UserService.name);
  }

  async createUser(
    ctx: RequestContext,
    input: CreateUserInput,
    sendEmail: boolean
  ): Promise<UserOutput> {
    this.logger.log(ctx, `${this.createUser.name} was called`);

    const user = plainToClass(User, input);

    user.slug = this.slugProvider.slugify(ctx, user.username);
    user.password = await hash(input.password, 10);

    this.logger.log(ctx, `calling ${UserRepository.name}.saveUser`);
    await this.repository.save(user);

    if (sendEmail) {
      this.logger.log(ctx, `calling ${MailService.name}.userSignUp`);
      user.activationKey = uuid();
      await this.repository.save(user);

      await this.mailService.userSignUp({
        to: user.email,
        name: user.username,
        data: {
          hash: user.activationKey
        },
      });
    }

    return plainToClass(UserOutput, user, {
      excludeExtraneousValues: true,
    });
  }

  async validateUsernamePassword(
    ctx: RequestContext,
    username: string,
    pass: string,
  ): Promise<UserOutput> {
    this.logger.log(ctx, `${this.validateUsernamePassword.name} was called`);

    this.logger.log(ctx, `calling ${UserRepository.name}.findOne`);
    const user = await this.repository.findOne({username});
    if (!user) throw new UnauthorizedException();

    const match = await compare(pass, user.password);
    if (!match) throw new UnauthorizedException();

    return plainToClass(UserOutput, user, {
      excludeExtraneousValues: true,
    });
  }

  async getUsers(
    ctx: RequestContext,
    limit: number,
    offset: number,
  ): Promise<{ users: UserOutput[]; count: number }> {
    this.logger.log(ctx, `${this.getUsers.name} was called`);

    this.logger.log(ctx, `calling ${UserRepository.name}.findAndCount`);
    const [users, count] = await this.repository.findAndCount({
      where: {},
      take: limit,
      skip: offset,
    });

    const usersOutput = plainToClass(UserOutput, users, {
      excludeExtraneousValues: true,
    });

    return {users: usersOutput, count};
  }

  async findById(ctx: RequestContext, id: string): Promise<UserOutput> {
    this.logger.log(ctx, `${this.findById.name} was called`);

    this.logger.log(ctx, `calling ${UserRepository.name}.findOne`);
    const user = await this.repository.findOne(id);

    return plainToClass(UserOutput, user, {
      excludeExtraneousValues: true,
    });
  }

  async getUserById(ctx: RequestContext, id: string): Promise<UserOutput> {
    this.logger.log(ctx, `${this.getUserById.name} was called`);

    this.logger.log(ctx, `calling ${UserRepository.name}.getById`);
    const user = await this.repository.getById(id);

    return plainToClass(UserOutput, user, {
      excludeExtraneousValues: true,
    });
  }

  async findByUsername(
    ctx: RequestContext,
    username: string,
  ): Promise<UserOutput> {
    this.logger.log(ctx, `${this.findByUsername.name} was called`);

    this.logger.log(ctx, `calling ${UserRepository.name}.findOne`);
    const user = await this.repository.findOne({username});

    return plainToClass(UserOutput, user, {
      excludeExtraneousValues: true,
    });
  }

  async updateUser(
    ctx: RequestContext,
    userId: string,
    input: UpdateUserInput,
  ): Promise<UserOutput> {
    this.logger.log(ctx, `${this.updateUser.name} was called`);

    this.logger.log(ctx, `calling ${UserRepository.name}.getById`);
    const user = await this.repository.getById(userId);

    // Hash the password if it exists in the input payload.
    if (input.password) {
      input.password = await hash(input.password, 10);
    }

    // merges the input (2nd line) to the found user (1st line)
    const updatedUser: User = {
      ...user,
      ...plainToClass(User, input),
    };

    this.logger.log(ctx, `calling ${UserRepository.name}.save`);
    await this.repository.save(updatedUser);

    return plainToClass(UserOutput, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  async activate(ctx: RequestContext, key: string): Promise<AccountMessageOutput> {
    this.logger.log(ctx, `${this.activate.name} was called`);

    const user = await this.repository.findOne({activationKey: key});
    if (!user) throw new BaseApiException("Invalid activation key", 400);

    user.isAccountDisabled = false;
    user.activationKey = null;
    this.repository.save(user);

    const message = new AccountMessageOutput();
    message.message = 'Account Successfully Activated';

    return plainToClass(AccountMessageOutput, message, {
      excludeExtraneousValues: true,
    });
  }

  async changePassword(ctx: RequestContext, changePasswordDTO: ChangePasswordDTO): Promise<AccountMessageOutput> {
    this.logger.log(ctx, `${this.changePassword.name} was called`);

    if (changePasswordDTO.newPassword !== changePasswordDTO.newPasswordConfirmation) {
      throw new BaseApiException('Passwords do not match', 400);
    }

    await this.validateUsernamePassword(ctx, ctx.user.username, changePasswordDTO.oldPassword);

    const user = await this.repository.findOne({username: ctx.user.username});

    user.password = await hash(changePasswordDTO.newPassword, 10);
    await this.repository.save(user);

    const message = new AccountMessageOutput();
    message.message = 'Password changed successfully';

    return plainToClass(AccountMessageOutput, message, {
      excludeExtraneousValues: true,
    });
  }

  async requestPasswordReset(ctx: RequestContext, passwordResetDTO: PasswordResetDTO): Promise<AccountMessageOutput> {
    this.logger.log(ctx, `${this.requestPasswordReset.name} was called`);

    // Check if user exists with email
    const user = await this.repository.findOne({ email: passwordResetDTO.email });

    if (user) {
      // Generate new password reset key
      const resetKey = uuid();

      // Save reset key to user
      user.resetKey = resetKey;
      user.resetDate = new Date();
      await this.repository.save(user);

      await this.mailService.forgotPassword({to: user.email, name: user.username, data: {hash: resetKey}});

    } else {
      this.logger.log(ctx, `calling ${UserRepository.name} was called with an invalid email`);
    }

    const message = new AccountMessageOutput();
    message.message = 'If the email address you entered is associated with an account, you should receive an email with further instructions.';

    return plainToClass(AccountMessageOutput, message, {
      excludeExtraneousValues: true,
    });
  }

  async completePasswordReset(ctx: RequestContext, keyAndPasswordVM: KeyAndPasswordVM): Promise<AccountMessageOutput> {
    this.logger.log(ctx, `${this.completePasswordReset.name} was called`);
    // find the user by the key
    const user = await this.repository.findOne({resetKey: keyAndPasswordVM.key});

    // check if the key is valid
    if (!user) {
      this.logger.warn(ctx, `${this.completePasswordReset.name} was called with an invalid key`);
      throw new BaseApiException('No user was found for this reset key', 400);
    }

    // check if the key is older than 2 hours
    if (user.resetDate.getTime() + 2 * 60 * 60 * 1000 < new Date().getTime()) {
      this.logger.warn(ctx, `${this.completePasswordReset.name} was called with an expired key`);
      throw new BaseApiException('Reset key is expired', 400);
    }

    user.password = await hash(keyAndPasswordVM.newPassword, 10);
    await this.repository.save(user); // save first to catch potential errors

    user.resetDate = null;
    user.resetKey = null;
    await this.repository.save(user);
    const message = new AccountMessageOutput();
    message.message = 'Password reset successfully';

    return plainToClass(AccountMessageOutput, message, {
      excludeExtraneousValues: true,
    });
  }
}
