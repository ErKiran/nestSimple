import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ bearerToken: string }> {
        const username = await this.userRepository.validateUser(authCredentialsDto);
        if (!username) {
            throw new UnauthorizedException('Invalid Credentails');
        }

        const jwtPayload: JwtPayload = { username };
        const bearerToken = await this.jwtService.sign(jwtPayload);

        return {
            bearerToken,
        };
    }
}
