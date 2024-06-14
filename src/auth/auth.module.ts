import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '1d' },
		}),
	],
	providers: [AuthService, UsersService],
	controllers: [AuthController, UsersController],
	exports: [AuthService],
})
export class AuthModule {}
