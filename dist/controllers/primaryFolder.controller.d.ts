import { Request, Response } from 'express';
import { JwtService } from "@nestjs/jwt";
export declare class PrimaryFolderController {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    createPrimaryFolder(req: Request, res: Response, headers: any): Promise<Response<any, Record<string, any>>>;
}
