import { Request, Response } from 'express';
import { JwtService } from "@nestjs/jwt";
import { JwtMiddleWareService } from "middleware/auth.service";
export declare class PrimaryFolderController {
    private readonly jwtMiddlewareService;
    private readonly jwtService;
    constructor(jwtMiddlewareService: JwtMiddleWareService, jwtService: JwtService);
    createPrimaryFolder(req: Request, res: Response, headers: any): Promise<Response<any, Record<string, any>>>;
    createRequestInPrimaryFolder(req: Request, res: Response, header: any): Promise<Response<any, Record<string, any>>>;
    readRequest(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
