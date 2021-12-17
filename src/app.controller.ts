import { Controller, Get } from '@nestjs/common';
import {HealthCheck, HealthCheckService, TypeOrmHealthIndicator} from "@nestjs/terminus";

import { AppService } from './app.service';
import { AppLogger } from './shared/logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly logger: AppLogger,
    private readonly appService: AppService,
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {
    this.logger.setContext(AppController.name);
  }

  @Get("/health")
  @HealthCheck()
  check(): any {
    return this.health.check([
      () => this.db.pingCheck('database'),
    ]);
  }
}
