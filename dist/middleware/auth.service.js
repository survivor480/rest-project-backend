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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtMiddleWareService = void 0;
const common_1 = require("@nestjs/common");
const connection_1 = require("../models/connection");
const jwt_1 = require("@nestjs/jwt");
const user_1 = require("../models/user");
let JwtMiddleWareService = class JwtMiddleWareService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async signIn(username) {
        const user = await connection_1.ConnectionPoint.manager.findBy(user_1.Users, [{
                username: username
            }, {
                email: username
            }]);
        const payload = { sub: user[0].id, username: username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
};
exports.JwtMiddleWareService = JwtMiddleWareService;
exports.JwtMiddleWareService = JwtMiddleWareService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtMiddleWareService);
//# sourceMappingURL=auth.service.js.map