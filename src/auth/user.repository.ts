import { Repository, EntityRepository } from "typeorm"
import { User } from "./user.entity"
import { AuthCredentialsDto } from "./dto/auth-credentials.dto"
import { ConflictException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {

        const { username, password } = authCredentialsDto;
        const user = new User();

        user.salt = await bcrypt.genSalt();
        user.username = username;
        user.password = await this.hashPassword(password, user.salt );

        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') { // duplicate user name
                throw new ConflictException('Username already use')
            }
        }

    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
}