import {IsNotEmpty, IsString} from "class-validator";

export class ActivateInput {
  @IsString()
  @IsNotEmpty()
  key: string;
}