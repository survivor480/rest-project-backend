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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const connection_1 = require("../models/connection");
const user_1 = require("../models/user");
const bcrypt_setup_1 = require("../middleware/bcrypt_setup");
let AppController = class AppController {
    constructor(authService) {
        this.authService = authService;
    }
    async registerUser(req, res) {
        const body = req.body;
        const newUser = new user_1.Users();
        newUser.fullname = body.fullname;
        newUser.username = body.username;
        newUser.password = await this.authService.hashPassword(body.password);
        newUser.phone_number = body.phone_number;
        const dateParts = body.date_of_birth.split('-');
        const day = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1;
        const year = parseInt(dateParts[2]);
        newUser.date_of_birth = new Date(year, month, day);
        await connection_1.ConnectionPoint.manager.save(newUser);
        const data = { status: 'success', message: 'User Account Created Successfully' };
        res.status(200).json(data);
    }
    async loginUser(req, res) {
        const body = req.body;
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "loginUser", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [bcrypt_setup_1.AuthService])
], AppController);
//# sourceMappingURL=app.controller.js.map