import { JwtService } from "@nestjs/jwt";
export declare class JwtMiddleWareService {
    private jwtService;
    constructor(jwtService: JwtService);
    signIn(username: string): Promise<any>;
}
