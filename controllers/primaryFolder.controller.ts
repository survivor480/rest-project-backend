import { Controller, Res, Req, Post, Headers } from "@nestjs/common";
import { Request, Response } from 'express';
import { ConnectionPoint } from "models/connection";
import { Users } from "models/user";
import { JwtService } from "@nestjs/jwt";
import { Primary_Folder } from "models/primary_folder";
import { Request_Details } from "models/request_details";
import { Secondary_Folder } from "models/secondary_folder";
import { Tertiary_Folder } from "models/tertiary_folder";
import { JwtMiddleWareService } from "middleware/auth.service";

@Controller('/primary_folder')
export class PrimaryFolderController {
    constructor(
        private readonly jwtMiddlewareService: JwtMiddleWareService,
        private readonly jwtService: JwtService
    ) {}

    @Post('/create')
    async createPrimaryFolder(@Req() req: Request, @Res() res: Response, @Headers() headers) {
        console.log("Create Primary Folder Called");

        console.log("This is headers being passed: ", headers.authorization);

        if(this.jwtMiddlewareService.checkForAccessTokenExpiry(req.headers.authorization)){
            return res.status(400).json({
                status: 'failed',
                message: 'Please login again'
            })
        }

        let decoded_value:any = this.jwtService.decode(headers.authorization);

        console.log(decoded_value.username);

        if(await this.jwtMiddlewareService.checkForAccessTokenExpiry(req.headers.authorization) === false){
            return res.status(400).json({
                status: 'failed',
                message: 'Please login again'
            })
        }

        console.log(req.body);

        console.log(req.headers);

        console.log(req.query);

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
        primary_folder.workspace_id = req.body.workspace_id

        await ConnectionPoint.manager.save(primary_folder);

        return res.status(200).json({
            status: 'success',
            message: 'Folder Created'
        })
    }


    @Post('/createRequest')
    async createRequestInPrimaryFolder(@Req() req: Request, @Res() res: Response, @Headers() header){
        
        console.log("This is the create Request API being called");
        const primary_folder_number = req.body.primary_folder_number;

        if(this.jwtMiddlewareService.checkForAccessTokenExpiry(req.headers.authorization)){
            return res.status(400).json({
                status: 'failed',
                message: 'Please login again'
            })
        }

        console.log(req.body);

        console.log(req.headers);

        console.log(req.query);

        const request_details = new Request_Details();
        request_details.primary_folder_id = primary_folder_number;

        await ConnectionPoint.manager.save(request_details);

        return res.status(200).json({
            status: 'success',
            message: 'Request Creation Successful'
        })
    }


    @Post('/read')
    async readRequest(@Req() req:Request, @Res() res: Response){

        console.log("Primary Folder Read Called");
        
        const workspace_id = req.query.workspace_id[0];
        const user_number = req.query.user_number[0];

        if(await this.jwtMiddlewareService.checkForAccessTokenExpiry(req.headers.authorization) === false){
            return res.status(400).json({
                status: 'failed',
                message: 'Please login again'
            })
        }

        console.log(req.body);

        console.log(req.headers);

        console.log(req.query);

        const repository = ConnectionPoint.manager.getRepository(Primary_Folder);

        let all_primary_folders_instance = await repository.find({
            where: {
                workspace_id: workspace_id,
                user_number: user_number
            }
        });

        let intermediate = [];

        for(let i=0; i<all_primary_folders_instance.length; i++){
            const secondary_folder_repository = ConnectionPoint.manager.getRepository(Secondary_Folder);
            const tertiary_folder_repository = ConnectionPoint.manager.getRepository(Tertiary_Folder);
            const request_details_repository = ConnectionPoint.manager.getRepository(Request_Details);

            let all_secondary_folders_instance:any = await secondary_folder_repository.find({
                where: {
                    primary_folder_id: all_primary_folders_instance[i].id
                }
            });

            let primary_folder_intermediate = {
                id: null,
                folder_name: null,
                user_number: null,
                workspace_id: null,
                secondary_folder_details: null,
                request_details: null
            };

            primary_folder_intermediate.id = all_primary_folders_instance[i].id;
            primary_folder_intermediate.folder_name = all_primary_folders_instance[i].folder_name;
            primary_folder_intermediate.user_number = all_primary_folders_instance[i].user_number;
            primary_folder_intermediate.workspace_id = all_primary_folders_instance[i].workspace_id;

            let secondary_folder = [];
            for(let j=0; j<all_secondary_folders_instance.length; j++){

                let all_tertiary_folders_instance = await tertiary_folder_repository.find({
                    where: {
                        secondary_folder_number: all_secondary_folders_instance[j].id
                    }
                });

                let secondary_folder_intermediate = {
                    id: null,
                    folder_name: null,
                    primary_folder_id: null,
                    tertiary_folder_details: null,
                    request_details: null
                };

                secondary_folder_intermediate.id = all_secondary_folders_instance[j].id;
                secondary_folder_intermediate.folder_name = all_secondary_folders_instance[j].folder_name;
                secondary_folder_intermediate.primary_folder_id = all_secondary_folders_instance[j].primary_folder_id;

                let tertiary_folder = [];

                for(let k=0; k<all_tertiary_folders_instance.length; k++){

                    let request_details_instance = await request_details_repository.find({
                        where: {
                            tertiary_folder_id: all_tertiary_folders_instance[k].id
                        }
                    });

                    let tertiary_folder_intermediate = {
                        id: null,
                        folder_name: null,
                        secondary_folder_number: null,
                        request_details: null
                    }

                    tertiary_folder_intermediate.id = all_tertiary_folders_instance[k].id;
                    tertiary_folder_intermediate.folder_name = all_tertiary_folders_instance[k].folder_name;
                    tertiary_folder_intermediate.secondary_folder_number = all_tertiary_folders_instance[k].secondary_folder_number;
                    tertiary_folder_intermediate.request_details = request_details_instance;  

                    tertiary_folder.push(tertiary_folder_intermediate);
                }

                if(tertiary_folder.length !== 0){
                    secondary_folder_intermediate.tertiary_folder_details = tertiary_folder;
                }

                let request_details_instance = await request_details_repository.find({
                    where: {
                        secondary_folder_id: all_secondary_folders_instance[i].id
                    }
                });

                if(request_details_instance.length !== 0){
                    secondary_folder_intermediate.request_details = request_details_instance
                }

                secondary_folder.push(secondary_folder_intermediate);
            }

            let request_details_instance = await request_details_repository.find({
                where: {
                    primary_folder_id: all_primary_folders_instance[i].id
                }
            });

            if(request_details_instance.length !== 0){
                primary_folder_intermediate.request_details = request_details_instance
            }

            if(secondary_folder.length !== 0){
                primary_folder_intermediate.secondary_folder_details = secondary_folder;
            }

            intermediate.push(primary_folder_intermediate);
        }

        return res.status(200).json({
            status: 'success',
            message: 'Done some changes',
            data: intermediate
        })
    }
}