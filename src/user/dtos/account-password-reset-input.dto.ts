import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, MaxLength} from "class-validator";

export class PasswordResetDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;
}