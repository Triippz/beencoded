import {EntitySubscriberInterface, EventSubscriber, InsertEvent} from "typeorm";

import {User} from "../entities/user.entity";
import {UserProfile} from "../entities/user-profile.entity";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo(): any {
    return User;
  }
  
  beforeInsert(event: InsertEvent<User>): Promise<any> | void {
    event.entity.profile = new UserProfile();
  }
  
}