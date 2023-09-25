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
exports.PrimaryFolderController = void 0;
const common_1 = require("@nestjs/common");
const connection_1 = require("../models/connection");
const user_1 = require("../models/user");
const jwt_1 = require("@nestjs/jwt");
const primary_folder_1 = require("../models/primary_folder");
const request_details_1 = require("../models/request_details");
const secondary_folder_1 = require("../models/secondary_folder");
const tertiary_folder_1 = require("../models/tertiary_folder");
const auth_service_1 = require("../middleware/auth.service");
let PrimaryFolderController = class PrimaryFolderController {
    constructor(jwtMiddlewareService, jwtService) {
        this.jwtMiddlewareService = jwtMiddlewareService;
        this.jwtService = jwtService;
    }
    async createPrimaryFolder(req, res, headers) {
        console.log("Create Primary Folder Called");
        console.log("This is headers being passed: ", headers.authorization);
        if (this.jwtMiddlewareService.checkForAccessTokenExpiry(req.headers.authorization)) {
            return res.status(400).json({
                status: 'failed',
                message: 'Please login again'
            });
        }
        let decoded_value = this.jwtService.decode(headers.authorization);
        console.log(decoded_value.username);
        if (await this.jwtMiddlewareService.checkForAccessTokenExpiry(req.headers.authorization) === false) {
            return res.status(400).json({
                status: 'failed',
                message: 'Please login again'
            });
        }
        console.log(req.body);
        console.log(req.headers);
        console.log(req.query);
        const user_instance = await connection_1.ConnectionPoint.manager.findBy(user_1.Users, {
            username: decoded_value.username
        });
        if (user_instance.length === 0) {
            return res.status(400).json({
                status: 'failed',
                message: 'No such user exists'
            });
        }
        const primary_folder = new primary_folder_1.Primary_Folder();
        primary_folder.folder_name = 'New Folder';
        primary_folder.user_number = decoded_value.sub;
        primary_folder.workspace_id = req.body.workspace_id;
        await connection_1.ConnectionPoint.manager.save(primary_folder);
        return res.status(200).json({
            status: 'success',
            message: 'Folder Created'
        });
    }
    async createRequestInPrimaryFolder(req, res, header) {
        console.log("This is the create Request API being called");
        const primary_folder_number = req.body.primary_folder_number;
        if (this.jwtMiddlewareService.checkForAccessTokenExpiry(req.headers.authorization)) {
            return res.status(400).json({
                status: 'failed',
                message: 'Please login again'
            });
        }
        console.log(req.body);
        console.log(req.headers);
        console.log(req.query);
        const request_details = new request_details_1.Request_Details();
        request_details.primary_folder_id = primary_folder_number;
        await connection_1.ConnectionPoint.manager.save(request_details);
        return res.status(200).json({
            status: 'success',
            message: 'Request Creation Successful'
        });
    }
    async readRequest(req, res) {
        console.log("Primary Folder Read Called");
        const workspace_id = req.query.workspace_id[0];
        const user_number = req.query.user_number[0];
        if (await this.jwtMiddlewareService.checkForAccessTokenExpiry(req.headers.authorization) === false) {
            return res.status(400).json({
                status: 'failed',
                message: 'Please login again'
            });
        }
        console.log(req.body);
        console.log(req.headers);
        console.log(req.query);
        const repository = connection_1.ConnectionPoint.manager.getRepository(primary_folder_1.Primary_Folder);
        let all_primary_folders_instance = await repository.find({
            where: {
                workspace_id: workspace_id,
                user_number: user_number
            }
        });
        let intermediate = [];
        for (let i = 0; i < all_primary_folders_instance.length; i++) {
            const secondary_folder_repository = connection_1.ConnectionPoint.manager.getRepository(secondary_folder_1.Secondary_Folder);
            const tertiary_folder_repository = connection_1.ConnectionPoint.manager.getRepository(tertiary_folder_1.Tertiary_Folder);
            const request_details_repository = connection_1.ConnectionPoint.manager.getRepository(request_details_1.Request_Details);
            let all_secondary_folders_instance = await secondary_folder_repository.find({
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
            for (let j = 0; j < all_secondary_folders_instance.length; j++) {
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
                for (let k = 0; k < all_tertiary_folders_instance.length; k++) {
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
                    };
                    tertiary_folder_intermediate.id = all_tertiary_folders_instance[k].id;
                    tertiary_folder_intermediate.folder_name = all_tertiary_folders_instance[k].folder_name;
                    tertiary_folder_intermediate.secondary_folder_number = all_tertiary_folders_instance[k].secondary_folder_number;
                    tertiary_folder_intermediate.request_details = request_details_instance;
                    tertiary_folder.push(tertiary_folder_intermediate);
                }
                if (tertiary_folder.length !== 0) {
                    secondary_folder_intermediate.tertiary_folder_details = tertiary_folder;
                }
                let request_details_instance = await request_details_repository.find({
                    where: {
                        secondary_folder_id: all_secondary_folders_instance[i].id
                    }
                });
                if (request_details_instance.length !== 0) {
                    secondary_folder_intermediate.request_details = request_details_instance;
                }
                secondary_folder.push(secondary_folder_intermediate);
            }
            let request_details_instance = await request_details_repository.find({
                where: {
                    primary_folder_id: all_primary_folders_instance[i].id
                }
            });
            if (request_details_instance.length !== 0) {
                primary_folder_intermediate.request_details = request_details_instance;
            }
            if (secondary_folder.length !== 0) {
                primary_folder_intermediate.secondary_folder_details = secondary_folder;
            }
            intermediate.push(primary_folder_intermediate);
        }
        return res.status(200).json({
            status: 'success',
            message: 'Done some changes',
            data: intermediate
        });
    }
};
exports.PrimaryFolderController = PrimaryFolderController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PrimaryFolderController.prototype, "createPrimaryFolder", null);
__decorate([
    (0, common_1.Post)('/createRequest'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PrimaryFolderController.prototype, "createRequestInPrimaryFolder", null);
__decorate([
    (0, common_1.Post)('/read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PrimaryFolderController.prototype, "readRequest", null);
exports.PrimaryFolderController = PrimaryFolderController = __decorate([
    (0, common_1.Controller)('/primary_folder'),
    __metadata("design:paramtypes", [auth_service_1.JwtMiddleWareService,
        jwt_1.JwtService])
], PrimaryFolderController);
//# sourceMappingURL=primaryFolder.controller.js.map