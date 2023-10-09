import { Request, Response } from 'express';
import { JwtService } from "@nestjs/jwt";
import { JwtMiddleWareService } from "middleware/auth.service";
export declare class EnvironmentController {
    private readonly jwtMiddlewareService;
    private readonly jwService;
    constructor(jwtMiddlewareService: JwtMiddleWareService, jwService: JwtService);
    createEnvironment(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    readEnvironment(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
