import { Request, Response } from 'express';
import { AuthService } from 'middleware/bcrypt_setup';
import { JwtMiddleWareService } from 'middleware/auth.service';
export declare class AppController {
    private readonly authService;
    private readonly jwtMiddlewareService;
    constructor(authService: AuthService, jwtMiddlewareService: JwtMiddleWareService);
    registerUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    loginUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
