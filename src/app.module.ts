import {Module} from '@nestjs/common';
import {TerminusModule} from "@nestjs/terminus";

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {MailModule} from './mail/mail.module';
import {PostModule} from './post/post.module';
import {SharedModule} from './shared/shared.module';
import {UserModule} from './user/user.module';

@Module({
  imports: [
    SharedModule,
    UserModule,
    AuthModule,
    PostModule,
    MailModule,
    TerminusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
