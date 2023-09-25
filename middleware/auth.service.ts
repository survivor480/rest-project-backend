import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConnectionPoint } from "models/connection";
import { JwtService } from "@nestjs/jwt";
import { Users } from "models/user";

@Injectable()
export class JwtMiddleWareService {
    constructor(private jwtService: JwtService) {}

    async signIn(username: string): Promise<any> {
        const user = await ConnectionPoint.manager.findBy(Users, [{
            username: username
        }, {
            email: username
        }]);

        const payload = { sub: user[0].id, username: username};

        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }

    async checkForAccessTokenExpiry(token: string): Promise<any> {
        let decoded_token = this.jwtService.verify(token);

        console.log(decoded_token);

        if(decoded_token.exp > Date.now()){
            return false
        } else {
            return true;
        }
    }
}