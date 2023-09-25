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
exports.RequestBodyService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const request_body_1 = require("../models/request_body");
let RequestBodyService = class RequestBodyService {
    constructor(requestBodyModel) {
        this.requestBodyModel = requestBodyModel;
    }
    async create(request_body) {
        const createdRequestBody = new this.requestBodyModel(request_body);
        return createdRequestBody.save();
    }
    async findAll() {
        return this.requestBodyModel.find().exec();
    }
    async find(request_id) {
        return this.requestBodyModel.find({ request_id: request_id }).exec();
    }
    async update(request_id, body_content) {
        return this.requestBodyModel.updateOne({ request_id: request_id }, body_content);
    }
};
exports.RequestBodyService = RequestBodyService;
exports.RequestBodyService = RequestBodyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(request_body_1.RequestBody.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], RequestBodyService);
//# sourceMappingURL=request_body.injectable.js.map