import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    async comparePasswords(
        enteredPassword: string,
        hashPassword: string
    ): Promise<boolean> {
        return bcrypt.compare(enteredPassword, hashPassword);
    }
}