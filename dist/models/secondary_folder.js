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
exports.Secondary_Folder = void 0;
const typeorm_1 = require("typeorm");
let Secondary_Folder = class Secondary_Folder {
};
exports.Secondary_Folder = Secondary_Folder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Secondary_Folder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 200 }),
    __metadata("design:type", String)
], Secondary_Folder.prototype, "folder_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Secondary_Folder.prototype, "primary_folder_id", void 0);
exports.Secondary_Folder = Secondary_Folder = __decorate([
    (0, typeorm_1.Entity)({ name: 'secondary_folder' })
], Secondary_Folder);
//# sourceMappingURL=secondary_folder.js.map