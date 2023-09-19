import { Request, Response } from 'express';
import { JwtService } from "@nestjs/jwt";
export declare class SecondaryFolderController {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    createSecondaryFolder(req: Request, res: Response, headers: any): Promise<Response<any, Record<string, any>>>;
}
