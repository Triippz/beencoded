import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { AUTHORITIES } from '../constants/authority.constant';

export const AUTHORITIES_KEY = 'authorities';
export const Authorities = (...authorities: AUTHORITIES[]): CustomDecorator<string> =>
  SetMetadata(AUTHORITIES_KEY, authorities);
