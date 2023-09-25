import { Controller, Req, Res, Post, Headers } from "@nestjs/common";
import { Request, Response } from 'express';
import { ConnectionPoint } from "models/connection";

import { JwtMiddleWareService } from "middleware/auth.service";
import { Workspace } from "models/workspace";
import { Primary_Folder } from "models/primary_folder";

@Controller('/workspace')
export class WorkspaceController {
    constructor (
        private readonly jwtMiddlewareService: JwtMiddleWareService
    ) {}

    @Post('/create')
    async createWorkspace(@Req() req: Request, @Res() res:Response){
        if(await this.jwtMiddlewareService.checkForAccessTokenExpiry(req.headers.authorization) === false){
            return res.status(400).json({
                status: 'failed',
                message: 'Please login again'
            })
        }

        console.log(req.body);

        console.log(req.headers);

        console.log(req.query);

        let workspace_name = req.body.workspace_name;
        let user_id = req.body.user_id;
        let default_workspace = req.body.default_workspace;

        let workspace = new Workspace();
        workspace.workspace_name = workspace_name;
        workspace.user_id = user_id;
        workspace.default = default_workspace;

        let saved_workspace_instance =  await ConnectionPoint.manager.save(workspace);

        return res.status(200).json({
            status: 'success',
            message: 'Workspace Created',
            workspace_id: saved_workspace_instance.id
        })
    }

    @Post('/read')
    async readWorkspace(@Req() req: Request, @Res() res: Response){
        if(await this.jwtMiddlewareService.checkForAccessTokenExpiry(req.headers.authorization)){
            return res.status(400).json({
                status: 'failed',
                message: 'Please login again'
            })
        }

        let workspace_id = req.body.workspace_id;
        let user_id = req.body.user_id;

        let workspace_repository = await ConnectionPoint.manager.getRepository(Workspace);

        let workspace_instance = await workspace_repository.find({
            where: {
                id: workspace_id
            }
        });

        console.log(req.body);

        console.log(req.headers);

        console.log(req.query);

        let primary_folder_repository = await ConnectionPoint.manager.getRepository(Primary_Folder);

        let primary_folder_instance = await primary_folder_repository.find({
            where: {
                workspace_id: workspace_id,
                user_number: user_id
            }
        });

        let workspace_details = {
            id: null,
            workspace_name: null,
            user_id: null,
            default: null,
            primary_folder_details: null
        };

        workspace_details.id = workspace_instance[0].id;
        workspace_details.workspace_name = workspace_instance[0].workspace_name;
        workspace_details.user_id = workspace_instance[0].user_id;
        workspace_details.default = workspace_instance[0].default;
        workspace_details.primary_folder_details = primary_folder_instance;

        return res.status(200).json({
            status: 'success',
            data: workspace_details
        });
    }
}