"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentController = void 0;
const common_1 = require("@nestjs/common");
const connection_1 = require("../models/connection");
const jwt_1 = require("@nestjs/jwt");
const environment_1 = require("../models/environment");
const auth_service_1 = require("../middleware/auth.service");
const variables_1 = require("../models/variables");
let EnvironmentController = class EnvironmentController {
    constructor(jwtMiddlewareService, jwService) {
        this.jwtMiddlewareService = jwtMiddlewareService;
        this.jwService = jwService;
    }
    async createEnvironment(req, res) {
        console.log("Create Environment API called");
        const environment = new environment_1.Environment();
        environment.environment_name = 'New Environment';
        environment.default = false;
        environment.type = 'global';
        environment.user_number = req.body.user_number;
        let environment_instance = await connection_1.ConnectionPoint.manager.save(environment);
        return res.status(200).json({
            status: 'success',
            message: 'Environment Created',
            environment_id: environment_instance.id
        });
    }
    async readEnvironment(req, res) {
        console.log("Read Environment API called");
        let environment_id = req.body.environment_id;
        let environment_repository = await connection_1.ConnectionPoint.manager.getRepository(environment_1.Environment);
        let environment_instance = await environment_repository.find({
            where: {
                id: environment_id
            }
        });
        let variables_repository = await connection_1.ConnectionPoint.manager.getRepository(variables_1.Variables);
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
        });
    }
};
exports.EnvironmentController = EnvironmentController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EnvironmentController.prototype, "createEnvironment", null);
__decorate([
    (0, common_1.Get)('/read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EnvironmentController.prototype, "readEnvironment", null);
exports.EnvironmentController = EnvironmentController = __decorate([
    (0, common_1.Controller)("/environment"),
    __metadata("design:paramtypes", [auth_service_1.JwtMiddleWareService,
        jwt_1.JwtService])
], EnvironmentController);
//# sourceMappingURL=environment.controller.js.map