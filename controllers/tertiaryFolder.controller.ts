import { Controller, Res, Req, Post, Headers } from "@nestjs/common";
import { Request, Response } from 'express';
import { ConnectionPoint } from "models/connection";
import { Users } from "models/user";
import { JwtService } from "@nestjs/jwt";
import { Tertiary_Folder } from "models/tertiary_folder";
import { Request_Details } from "models/request_details";

@Controller('/tertiary_folder')
export class TertiaryFolderController {
    constructor(
        private readonly jwtService: JwtService
    ) {}

    @Post('/create')
    async createTertiaryFolder(@Req() req: Request, @Res() res: Response, @Headers() headers) {
        console.log("Create Primary Folder Called");

        console.log("This is headers being passed: ", headers.authorization);

        console.log(req.body);

        console.log(req.headers);

        console.log(req.query);

        const secondary_folder_number = req.body.secondary_folder_number;

        let decoded_value:any = this.jwtService.decode(headers.authorization);

        console.log(decoded_value.username);

        const user_instance:any = await ConnectionPoint.manager.findBy(Users, {
            username: decoded_value.username
        });

        if(user_instance.length === 0){
            return res.status(400).json({
                status: 'failed',
                message: 'No such user exists'
            })
        }

        const tertiary_folder = new Tertiary_Folder();

        tertiary_folder.folder_name = 'New Folder';
        tertiary_folder.secondary_folder_number = secondary_folder_number;

        const tertiary_folder_instance = await ConnectionPoint.manager.save(tertiary_folder);

        return res.status(200).json({
            status: 'success',
            message: 'Folder Created',
            tertiary_folder_id: tertiary_folder[0].id
        })
    }

    @Post('/createRequest')
    async createRequestInTertiaryFolder(@Req() req: Request, @Res() res: Response, @Headers() header){
        const tertiary_folder_number = req.body.tertiary_folder_number;

        const request_details = new Request_Details();
        request_details.tertiary_folder_id = tertiary_folder_number;

        console.log(req.body);

        console.log(req.headers);

        console.log(req.query);

        await ConnectionPoint.manager.save(request_details);

        return res.status(200).json({
            status: 'success',
            message: 'Request Creation Successful'
        });
    }
}