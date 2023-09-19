import { Controller, Res, Req, Post, Headers } from "@nestjs/common";
import { Request, Response } from 'express';
import { ConnectionPoint } from "models/connection";
import { Users } from "models/user";
import { JwtService } from "@nestjs/jwt";
import { Primary_Folder } from "models/primary_folder";

@Controller('/primary_folder')
export class PrimaryFolderController {
    constructor(
        private readonly jwtService: JwtService
    ) {}

    @Post('/create')
    async createPrimaryFolder(@Req() req: Request, @Res() res: Response, @Headers() headers) {
        console.log("Create Primary Folder Called");

        console.log("This is headers being passed: ", headers.authorization);

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

        const primary_folder = new Primary_Folder();

        primary_folder.folder_name = 'New Folder';
        primary_folder.user_number = decoded_value.sub;

        await ConnectionPoint.manager.save(primary_folder);

        return res.status(200).json({
            status: 'success',
            message: 'Done'
        })
    }
}