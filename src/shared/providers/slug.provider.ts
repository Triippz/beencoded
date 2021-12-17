import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const slug = require('slug');

import {AppLogger} from "../logger/logger.service";
import {RequestContext} from "../request-context/request-context.dto";

@Injectable()
export class SlugProvider {
  constructor(private readonly logger: AppLogger) {
    this.logger.setContext(SlugProvider.name);
  }

  slugify(ctx: RequestContext, text: string): string {
    this.logger.log(ctx, `calling ${SlugProvider.name}.slugify. Slugifying ${text}`);
    return slug(text, {lower: true});
  }
}