import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { AUTHORITIES } from '../constants/authority.constant';

export class AuthTokenOutput {
  @Expose()
  @ApiProperty()
  accessToken: string;

  @Expose()
  @ApiProperty()
  refreshToken: string;
}

export class UserAccessTokenClaims {
  @Expose()
  id: string;
  @Expose()
  username: string;
  @Expose()
  authorities: AUTHORITIES[];
}

export class UserRefreshTokenClaims {
  id: number;
}
