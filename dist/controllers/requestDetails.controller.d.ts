import { Request, Response } from 'express';
import { JwtMiddleWareService } from "middleware/auth.service";
import { RequestBodyService } from "middleware/request_body.injectable";
export declare class RequestDetailsController {
    private readonly jwtService;
    private readonly requestBodyService;
    constructor(jwtService: JwtMiddleWareService, requestBodyService: RequestBodyService);
    updateRequestDetails(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    readRequestDetails(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
