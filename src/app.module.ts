import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, UserModule, DatabaseModule],
	controllers: [AppController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
		AppService,
	],
})
export class AppModule {}
