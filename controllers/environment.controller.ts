import { Controller, Res, Req, Post, Headers, Get } from "@nestjs/common";
import { Request, Response } from 'express';
import { ConnectionPoint } from "models/connection";
import { Users } from "models/user";
import { JwtService } from "@nestjs/jwt";

import { Environment } from "models/environment";
import { JwtMiddleWareService } from "middleware/auth.service";

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
}