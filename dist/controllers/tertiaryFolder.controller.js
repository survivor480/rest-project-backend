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
exports.TertiaryFolderController = void 0;
const common_1 = require("@nestjs/common");
const connection_1 = require("../models/connection");
const user_1 = require("../models/user");
const jwt_1 = require("@nestjs/jwt");
const tertiary_folder_1 = require("../models/tertiary_folder");
const request_details_1 = require("../models/request_details");
let TertiaryFolderController = class TertiaryFolderController {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async createTertiaryFolder(req, res, headers) {
        console.log("Create Primary Folder Called");
        console.log("This is headers being passed: ", headers.authorization);
        const secondary_folder_number = req.body.secondary_folder_number;
        let decoded_value = this.jwtService.decode(headers.authorization);
        console.log(decoded_value.username);
        const user_instance = await connection_1.ConnectionPoint.manager.findBy(user_1.Users, {
            username: decoded_value.username
        });
        if (user_instance.length === 0) {
            return res.status(400).json({
                status: 'failed',
                message: 'No such user exists'
            });
        }
        const tertiary_folder = new tertiary_folder_1.Tertiary_Folder();
        tertiary_folder.folder_name = 'New Folder';
        tertiary_folder.secondary_folder_number = secondary_folder_number;
        await connection_1.ConnectionPoint.manager.save(tertiary_folder);
        return res.status(200).json({
            status: 'success',
            message: 'Done'
        });
    }
    async createRequestInTertiaryFolder(req, res, header) {
        const tertiary_folder_number = req.body.tertiary_folder_number;
        const request_details = new request_details_1.Request_Details();
        request_details.tertiary_folder_id = tertiary_folder_number;
        await connection_1.ConnectionPoint.manager.save(request_details);
        return res.status(200).json({
            status: 'success',
            message: 'Request Creation Successful'
        });
    }
};
exports.TertiaryFolderController = TertiaryFolderController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TertiaryFolderController.prototype, "createTertiaryFolder", null);
__decorate([
    (0, common_1.Post)('/createRequest'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TertiaryFolderController.prototype, "createRequestInTertiaryFolder", null);
exports.TertiaryFolderController = TertiaryFolderController = __decorate([
    (0, common_1.Controller)('/tertiary_folder'),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], TertiaryFolderController);
//# sourceMappingURL=tertiaryFolder.controller.js.map