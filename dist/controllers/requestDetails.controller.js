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
const jwt_1 = require("@nestjs/jwt");
const request_details_1 = require("../models/request_details");
let RequestDetailsController = class RequestDetailsController {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async updateRequestDetails(req, res) {
        const request_type = req.body.request_type;
        const request_endpoint = req.body.request_endpoint;
        const Authorization_Type = req.body.Authorization_Type;
        const body_type = req.body.body_type;
        const request_details_id = req.body.request_details_id;
        const request_details = new request_details_1.Request_Details();
        request_details.request_type = request_type;
        request_details.request_endpoint = request_endpoint;
        request_details.Authorization_Type = Authorization_Type;
        request_details.body_type = body_type;
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
exports.RequestDetailsController = RequestDetailsController = __decorate([
    (0, common_1.Controller)('/request'),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], RequestDetailsController);
//# sourceMappingURL=requestDetails.controller.js.map