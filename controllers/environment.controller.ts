import { Controller, Res, Req, Post, Headers, Get } from "@nestjs/common";
import { Request, Response } from 'express';
import { ConnectionPoint } from "models/connection";
import { JwtService } from "@nestjs/jwt";

import { Environment } from "models/environment";
import { JwtMiddleWareService } from "middleware/auth.service";
import { Variables } from "models/variables";

@Controller("/environment")
export class EnvironmentController {
    constructor(
        private readonly jwtMiddlewareService: JwtMiddleWareService,
        private readonly jwService: JwtService
    ) {}

    @Post('/create')
    async createEnvironment(@Req() req: Request, @Res() res: Response){
        console.log("Create Environment API called");

        const environment = new Environment();
        environment.environment_name = 'New Environment';
        environment.default = false;
        environment.type = 'global';
        environment.user_number = req.body.user_number;

        let environment_instance = await ConnectionPoint.manager.save(environment);

        return res.status(200).json({
            status: 'success',
            message: 'Environment Created',
            environment_id: environment_instance.id
        })
    }

    @Get('/read')
    async readEnvironment(@Req() req: Request, @Res() res: Response){
        console.log("Read Environment API called");

        let environment_id = req.body.environment_id;

        let environment_repository = await ConnectionPoint.manager.getRepository(Environment);

        let environment_instance:any = await environment_repository.find({
            where: {
                id: environment_id
            }
        });

        let variables_repository = await ConnectionPoint.manager.getRepository(Variables);

        let variables_instance = await variables_repository.find({
            where: {
                environment_id: environment_id
            }
        });

        environment_instance.variables = variables_instance;

        console.log(environment_instance);

        return res.status(200).json({
            status: 'success',
            data: environment_instance
        })
    }
}