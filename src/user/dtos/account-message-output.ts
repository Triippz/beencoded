import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class AccountMessageOutput {
  @Expose()
  @ApiProperty()
  message: string;
}