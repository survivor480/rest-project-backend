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
exports.WorkspaceController = void 0;
const common_1 = require("@nestjs/common");
const connection_1 = require("../models/connection");
const auth_service_1 = require("../middleware/auth.service");
const workspace_1 = require("../models/workspace");
const primary_folder_1 = require("../models/primary_folder");
let WorkspaceController = class WorkspaceController {
    constructor(jwtMiddlewareService) {
        this.jwtMiddlewareService = jwtMiddlewareService;
    }
    async createWorkspace(req, res) {
        if (await this.jwtMiddlewareService.checkForAccessTokenExpiry(req.headers.authorization) === false) {
            return res.status(400).json({
                status: 'failed',
                message: 'Please login again'
            });
        }
        console.log(req.body);
        console.log(req.headers);
        console.log(req.query);
        let workspace_name = req.body.workspace_name;
        let user_id = req.body.user_id;
        let default_workspace = req.body.default_workspace;
        let workspace = new workspace_1.Workspace();
        workspace.workspace_name = workspace_name;
        workspace.user_id = user_id;
        workspace.default = default_workspace;
        let saved_workspace_instance = await connection_1.ConnectionPoint.manager.save(workspace);
        return res.status(200).json({
            status: 'success',
            message: 'Workspace Created',
            workspace_id: saved_workspace_instance.id
        });
    }
    async readWorkspace(req, res) {
        if (await this.jwtMiddlewareService.checkForAccessTokenExpiry(req.headers.authorization)) {
            return res.status(400).json({
                status: 'failed',
                message: 'Please login again'
            });
        }
        let workspace_id = req.body.workspace_id;
        let user_id = req.body.user_id;
        let workspace_repository = await connection_1.ConnectionPoint.manager.getRepository(workspace_1.Workspace);
        let workspace_instance = await workspace_repository.find({
            where: {
                id: workspace_id
            }
        });
        console.log(req.body);
        console.log(req.headers);
        console.log(req.query);
        let primary_folder_repository = await connection_1.ConnectionPoint.manager.getRepository(primary_folder_1.Primary_Folder);
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
};
exports.WorkspaceController = WorkspaceController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "createWorkspace", null);
__decorate([
    (0, common_1.Post)('/read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "readWorkspace", null);
exports.WorkspaceController = WorkspaceController = __decorate([
    (0, common_1.Controller)('/workspace'),
    __metadata("design:paramtypes", [auth_service_1.JwtMiddleWareService])
], WorkspaceController);
//# sourceMappingURL=workspace.controller.js.map