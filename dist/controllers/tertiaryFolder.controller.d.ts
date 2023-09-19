import { Request, Response } from 'express';
import { JwtService } from "@nestjs/jwt";
export declare class TertiaryFolderController {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    createTertiaryFolder(req: Request, res: Response, headers: any): Promise<Response<any, Record<string, any>>>;
    createRequestInTertiaryFolder(req: Request, res: Response, header: any): Promise<Response<any, Record<string, any>>>;
}
