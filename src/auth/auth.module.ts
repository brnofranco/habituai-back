import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { UserService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '1d' },
		}),
	],
	providers: [AuthService, UserService],
	controllers: [AuthController, UserController],
	exports: [AuthService],
})
export class AuthModule {}
