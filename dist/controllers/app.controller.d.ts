import { Request, Response } from 'express';
import { AuthService } from 'middleware/bcrypt_setup';
export declare class AppController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(req: Request, res: Response): Promise<void>;
    loginUser(req: Request, res: Response): Promise<void>;
}
