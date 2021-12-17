import { AUTHORITIES } from '../../auth/constants/authority.constant';
import { Action } from './action.constant';
import { Actor } from './actor.constant';
import { Resource } from './resource.constant';

/**
 * Custom rule callback definition
 */
export type RuleCallback = (resource: Resource, actor: Actor) => boolean;

/**
 * ACL rule format
 */
export type AclRule = {
  //if rule for particular authority or for all authority
  authority: AUTHORITIES;

  //list of actions permissible
  actions: Action[];

  //specific rule there or otherwise true
  ruleCallback?: RuleCallback;
};
