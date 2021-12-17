import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, Length} from "class-validator";

export class KeyAndPasswordVM {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(36, 36)
  key: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  newPassword: string;

}