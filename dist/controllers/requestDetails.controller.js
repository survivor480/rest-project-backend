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
exports.RequestDetailsController = void 0;
const common_1 = require("@nestjs/common");
const connection_1 = require("../models/connection");
const auth_service_1 = require("../middleware/auth.service");
const request_details_1 = require("../models/request_details");
const request_body_1 = require("../models/request_body");
const request_body_injectable_1 = require("../middleware/request_body.injectable");
let RequestDetailsController = class RequestDetailsController {
    constructor(jwtService, requestBodyService) {
        this.jwtService = jwtService;
        this.requestBodyService = requestBodyService;
    }
    async updateRequestDetails(req, res) {
        if (await this.jwtService.checkForAccessTokenExpiry(req.headers.authorization) === false) {
            return res.status(400).json({
                status: 'failed',
                message: 'You need to login again'
            });
        }
        ;
        const request_type = req.body.request_type;
        const request_endpoint = req.body.request_endpoint;
        const Authorization_Type = req.body.Authorization_Type;
        const body_type = req.body.body_type;
        const request_details_id = req.body.request_details_id;
        const body_content = req.body.body_content;
        const body_structure_type = req.body.body_structure_type;
        const request_body = new request_body_1.RequestBody();
        request_body.body_type = body_type;
        request_body.body_structure_type = body_structure_type;
        request_body.body_content = body_content;
        request_body.request_id = request_details_id;
        console.log(req.body);
        console.log(req.headers);
        console.log(req.query);
        const requestBodyInstance = await this.requestBodyService.find(request_details_id);
        console.log(requestBodyInstance);
        if (requestBodyInstance.length === 0) {
            await this.requestBodyService.create(request_body);
        }
        else {
            await this.requestBodyService.update(request_details_id, request_body);
        }
        await connection_1.ConnectionPoint.createQueryBuilder().update(request_details_1.Request_Details).set({
            request_type: request_type,
            request_endpoint: request_endpoint,
            Authorization_Type: Authorization_Type,
            body_type: body_type
        }).where("id = :id", { id: request_details_id }).execute().then(() => {
            console.log("Query Executed Successfully");
            return res.status(200).json({
                status: 'success',
                message: 'Request Updated Successfully'
            });
        }).catch(err => {
            console.log(err);
            return res.status(400).json({
                status: 'failed',
                message: 'Request Update failed'
            });
        });
    }
    async readRequestDetails(req, res) {
        console.log("This is the Read Request Details being called");
        if (await this.jwtService.checkForAccessTokenExpiry(req.headers.authorization) === false) {
            return res.status(400).json({
                status: 'failed',
                message: 'You need to login again'
            });
        }
        ;
        console.log(req.body);
        console.log(req.headers);
        console.log(req.query);
        const request_details_id = req.query.request_details_id[0];
        if (request_details_id === undefined || request_details_id === "") {
            return res.status(400).json({
                status: 'failed',
                message: 'Request Id needed'
            });
        }
        let request_details_instance = await connection_1.ConnectionPoint.manager.findBy(request_details_1.Request_Details, {
            id: parseInt(request_details_id)
        });
        console.log(request_details_instance);
        if (request_details_instance.length === 0) {
            return res.status(200).json({
                status: 'success',
                message: []
            });
        }
        const requestBodyInstance = await this.requestBodyService.find(request_details_id);
        let final_value = { ...request_details_instance[0], body_details: requestBodyInstance[0].body_content };
        return res.status(200).json({
            status: 'success',
            data: final_value
        });
    }
};
exports.RequestDetailsController = RequestDetailsController;
__decorate([
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RequestDetailsController.prototype, "updateRequestDetails", null);
__decorate([
    (0, common_1.Get)('/read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RequestDetailsController.prototype, "readRequestDetails", null);
exports.RequestDetailsController = RequestDetailsController = __decorate([
    (0, common_1.Controller)('/request'),
    __metadata("design:paramtypes", [auth_service_1.JwtMiddleWareService,
        request_body_injectable_1.RequestBodyService])
], RequestDetailsController);
//# sourceMappingURL=requestDetails.controller.js.map