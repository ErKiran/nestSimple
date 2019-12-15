import { Repository, EntityRepository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password, fullname } = authCredentialsDto;
        const salt = await this.generateSalt();
        const user = new User();
        user.username = username;
        user.password = await this.hashPassword(password, salt);
        user.fullname = fullname;
        try {
            await user.save();
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new ConflictException(`Username is already taken ${err}`);
            }
            throw new InternalServerErrorException(err);

        }
    }

    async generateSalt(): Promise<string> {
        return await bcrypt.genSalt(10);
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username });

        if (user && await this.validatePassword(password, user.password)) {
            return user.username;
        }
        return null;
    }

    async validatePassword(password: string, userPassword: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(password, userPassword);
        return isMatch;
    }
}
