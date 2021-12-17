import { Injectable } from '@nestjs/common';

import { AUTHORITIES } from '../../auth/constants/authority.constant';
import { BaseAclService } from '../../shared/acl/acl.service';
import { Action } from '../../shared/acl/action.constant';
import { Actor } from '../../shared/acl/actor.constant';
import { User } from '../entities/user.entity';

@Injectable()
export class UserAclService extends BaseAclService {
  constructor() {
    super();
    // Admin can do all action
    this.canDo(AUTHORITIES.ADMIN, [Action.Manage]);
    //user can read himself or any other user
    this.canDo(AUTHORITIES.USER, [Action.Read]);
    // user can only update himself
    this.canDo(AUTHORITIES.USER, [Action.Update], this.isUserItself);
  }

  isUserItself(resource: User, actor: Actor): boolean {
    return resource.id === actor.id;
  }
}
