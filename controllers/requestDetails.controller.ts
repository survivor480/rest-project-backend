import { Controller, Res, Req, Post, Get } from "@nestjs/common";
import { Request, Response } from 'express';
import { ConnectionPoint } from "models/connection";
import { JwtMiddleWareService } from "middleware/auth.service";
import { Request_Details } from "models/request_details";
import { RequestBody } from "models/request_body";
import { RequestBodyService } from "middleware/request_body.injectable";

@Controller('/request')
export class RequestDetailsController {
    constructor(
        private readonly jwtService: JwtMiddleWareService,
        private readonly requestBodyService: RequestBodyService
    ) {}

    @Post('/update')
    async updateRequestDetails(@Req() req: Request, @Res() res: Response){
        if(await this.jwtService.checkForAccessTokenExpiry(req.headers.authorization) === false){
            return res.status(400).json({
                status: 'failed',
                message: 'You need to login again'
            })
        };

        const request_type = req.body.request_type;
        const request_endpoint = req.body.request_endpoint;
        const Authorization_Type = req.body.Authorization_Type;
        const body_type = req.body.body_type;
        const request_details_id = req.body.request_details_id;
        const body_content = req.body.body_content;
        const body_structure_type = req.body.body_structure_type;

        const request_body = new RequestBody();
        request_body.body_type = body_type;
        request_body.body_structure_type = body_structure_type;
        request_body.body_content = body_content;
        request_body.request_id = request_details_id;

        console.log(req.body);

        console.log(req.headers);

        console.log(req.query);

        const requestBodyInstance = await this.requestBodyService.find(request_details_id);

        console.log(requestBodyInstance);

        if(requestBodyInstance.length === 0){
            await this.requestBodyService.create(request_body)
        } else {
            await this.requestBodyService.update(request_details_id, request_body);
        }

        await ConnectionPoint.createQueryBuilder().update(Request_Details).set({
            request_type: request_type,
            request_endpoint: request_endpoint,
            Authorization_Type: Authorization_Type,
            body_type: body_type
        }).where("id = :id", { id: request_details_id}).execute().then(() => {
            console.log("Query Executed Successfully");

            return res.status(200).json({
                status: 'success',
                message: 'Request Updated Successfully'
            })
        }).catch(err => {
            console.log(err);

            return res.status(400).json({
                status: 'failed',
                message: 'Request Update failed'
            })
        });
    }


    @Get('/read')
    async readRequestDetails(@Req() req: Request, @Res() res: Response){
        console.log("This is the Read Request Details being called");

        if(await this.jwtService.checkForAccessTokenExpiry(req.headers.authorization) === false){
            return res.status(400).json({
                status: 'failed',
                message: 'You need to login again'
            })
        };

        console.log(req.body);

        console.log(req.headers);

        console.log(req.query);

        const request_details_id = req.query.request_details_id[0];

        if(request_details_id === undefined || request_details_id === ""){
            return res.status(400).json({
                status: 'failed',
                message: 'Request Id needed'
            })
        }

        let request_details_instance = await ConnectionPoint.manager.findBy(Request_Details, {
            id: parseInt(request_details_id)
        });

        console.log(request_details_instance);

        if(request_details_instance.length === 0){
            return res.status(200).json({
                status: 'success',
                message: []
            })
        }

        const requestBodyInstance = await this.requestBodyService.find(request_details_id);

        let final_value = {...request_details_instance[0], body_details: requestBodyInstance[0].body_content};

        return res.status(200).json({
            status: 'success',
            data: final_value
        });
    }

}