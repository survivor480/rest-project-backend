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
exports.Tertiary_Folder = void 0;
const typeorm_1 = require("typeorm");
let Tertiary_Folder = class Tertiary_Folder {
};
exports.Tertiary_Folder = Tertiary_Folder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tertiary_Folder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 200 }),
    __metadata("design:type", String)
], Tertiary_Folder.prototype, "folder_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Tertiary_Folder.prototype, "secondary_folder_number", void 0);
exports.Tertiary_Folder = Tertiary_Folder = __decorate([
    (0, typeorm_1.Entity)({ name: 'tertiary_folder' })
], Tertiary_Folder);
//# sourceMappingURL=tertiary_folder.js.map