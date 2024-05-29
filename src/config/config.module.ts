import { ConfigModuleOptions, ConfigModule as NestConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({})
export class ConfigModule extends NestConfigModule {
	static forRoot(options: ConfigModuleOptions = {}) {
		return super.forRoot({ isGlobal: true, ...options });
	}
}
