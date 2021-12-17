import {AUTHORITIES} from "../../auth/constants/authority.constant";

/**
 * The actor who is perfoming the action
 */
export interface Actor {
  id: string;

  // username: string;

  authorities: AUTHORITIES[];
}
