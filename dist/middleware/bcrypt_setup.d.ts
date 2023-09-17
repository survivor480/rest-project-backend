export declare class AuthService {
    hashPassword(password: string): Promise<string>;
    comparePasswords(enteredPassword: string, hashPassword: string): Promise<boolean>;
}
