import { Controller, Res, Req, Post, Headers } from "@nestjs/common";
import { Request, Response } from 'express';
import { ConnectionPoint } from "models/connection";
import { Users } from "models/user";
import { JwtService } from "@nestjs/jwt";
import { Tertiary_Folder } from "models/tertiary_folder";
import { Request_Details } from "models/request_details";

@Controller('/request')
export class RequestDetailsController {
    constructor(
        private readonly jwtService: JwtService
    ) {}

    @Post('/update')
    async updateRequestDetails(@Req() req: Request, @Res() res: Response){
        const request_type = req.body.request_type;
        const request_endpoint = req.body.request_endpoint;
        const Authorization_Type = req.body.Authorization_Type;
        const body_type = req.body.body_type;
        const request_details_id = req.body.request_details_id;

        const request_details = new Request_Details();
        request_details.request_type = request_type;
        request_details.request_endpoint = request_endpoint;
        request_details.Authorization_Type = Authorization_Type;
        request_details.body_type = body_type;

        // await ConnectionPoint.manager.save({
        //     id: request_details_id,

        // })
    }
}