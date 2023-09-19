import { Controller, Res, Req, Post, Headers } from "@nestjs/common";
import { Request, Response } from 'express';
import { ConnectionPoint } from "models/connection";
import { Users } from "models/user";
import { JwtService } from "@nestjs/jwt";
import { Secondary_Folder } from "models/secondary_folder";

@Controller('/secondary_folder')
export class SecondaryFolderController {
    constructor(
        private readonly jwtService: JwtService
    ) {}

    @Post('/create')
    async createSecondaryFolder(@Req() req: Request, @Res() res: Response, @Headers() headers) {
        console.log("Create Primary Folder Called");

        console.log("This is headers being passed: ", headers.authorization);

        const primary_folder_number = req.body.primary_folder_number;

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

        const secondary_folder = new Secondary_Folder();

        secondary_folder.folder_name = 'New Folder';
        secondary_folder.primary_folder_number = primary_folder_number;

        await ConnectionPoint.manager.save(secondary_folder);

        return res.status(200).json({
            status: 'success',
            message: 'Done'
        })
    }
}