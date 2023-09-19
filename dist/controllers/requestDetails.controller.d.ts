import { Request, Response } from 'express';
import { JwtService } from "@nestjs/jwt";
export declare class RequestDetailsController {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    updateRequestDetails(req: Request, res: Response): Promise<void>;
}
