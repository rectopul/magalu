import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginController } from './login/login.controller';
import { SessionModule } from './session/session.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DashboardModule, SessionModule, UsersModule, ClientsModule, AccountModule],
  controllers: [AppController, LoginController],
  providers: [AppService],
})
export class AppModule {}
