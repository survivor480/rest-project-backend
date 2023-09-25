import { Request, Response } from 'express';
import { JwtMiddleWareService } from "middleware/auth.service";
export declare class WorkspaceController {
    private readonly jwtMiddlewareService;
    constructor(jwtMiddlewareService: JwtMiddleWareService);
    createWorkspace(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    readWorkspace(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
