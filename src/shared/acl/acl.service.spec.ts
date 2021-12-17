import { Test, TestingModule } from '@nestjs/testing';

import { AUTHORITIES } from '../../auth/constants/authority.constant';
import { BaseAclService } from './acl.service';
import { RuleCallback } from './acl-rule.constant';
import { Action } from './action.constant';

class MockAclService extends BaseAclService {
  public canDo(authority: AUTHORITIES, actions: Action[], ruleCallback?: RuleCallback) {
    super.canDo(authority, actions, ruleCallback);
  }

  public getAclRules() {
    return this.aclRules;
  }
}

describe('AclService', () => {
  let service: MockAclService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MockAclService],
    }).compile();

    service = module.get<MockAclService>(MockAclService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('canDo', () => {
    it('should add acl rule', () => {
      service.canDo(AUTHORITIES.USER, [Action.Read]);
      const aclRules = service.getAclRules();
      expect(aclRules).toContainEqual({
        authority: AUTHORITIES.USER,
        actions: [Action.Read],
      });
    });

    it('should add acl rule with custom rule', () => {
      const customRuleCallback = () => true;
      service.canDo(AUTHORITIES.USER, [Action.Read], customRuleCallback);

      const aclRules = service.getAclRules();

      expect(aclRules).toContainEqual({
        authority: AUTHORITIES.USER,
        actions: [Action.Read],
        ruleCallback: customRuleCallback,
      });
    });
  });

  describe('forActor', () => {
    const user = {
      id: "6",
      username: 'foo',
      authorities: [AUTHORITIES.USER],
    };

    const admin = {
      id: "7",
      username: 'admin',
      authorities: [AUTHORITIES.ADMIN],
    };

    it('should return canDoAction method', () => {
      const userAcl = service.forActor(user);
      expect(userAcl.canDoAction).toBeDefined();
    });

    it('should return false when no authority sepcific rules found', () => {
      service.canDo(AUTHORITIES.USER, [Action.Read]);
      const userAcl = service.forActor(admin);
      expect(userAcl.canDoAction(Action.Read)).toBeFalsy();
    });

    it('should return false when no action sepcific rules found', () => {
      service.canDo(AUTHORITIES.USER, [Action.Read]);
      const userAcl = service.forActor(user);
      expect(userAcl.canDoAction(Action.Create)).toBeFalsy();
    });

    it('should return true when authority has action permission', () => {
      service.canDo(AUTHORITIES.USER, [Action.Read]);
      const userAcl = service.forActor(user);
      expect(userAcl.canDoAction(Action.Read)).toBeTruthy();
    });

    it('should return true when ruleCallback is true', () => {
      const customOwnerRule = () => true;
      service.canDo(AUTHORITIES.USER, [Action.Manage], customOwnerRule);
      const userAcl = service.forActor(user);
      expect(userAcl.canDoAction(Action.Read)).toBeTruthy();
    });

    it('should return false when ruleCallback is false', () => {
      const customOwnerRule = () => false;
      service.canDo(AUTHORITIES.USER, [Action.Manage], customOwnerRule);
      const userAcl = service.forActor(user);
      expect(userAcl.canDoAction(Action.Read)).toBeFalsy();
    });
  });
});
