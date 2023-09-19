"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("../controllers/user.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const user_1 = require("../models/user");
const primary_folder_1 = require("../models/primary_folder");
const secondary_folder_1 = require("../models/secondary_folder");
const tertiary_folder_1 = require("../models/tertiary_folder");
const request_details_1 = require("../models/request_details");
const bcrypt_setup_1 = require("../middleware/bcrypt_setup");
const auth_service_1 = require("../middleware/auth.service");
const primaryFolder_controller_1 = require("../controllers/primaryFolder.controller");
const secondaryFolder_controller_1 = require("../controllers/secondaryFolder.controller");
const tertiaryFolder_controller_1 = require("../controllers/tertiaryFolder.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: '127.0.0.1',
                port: 3301,
                username: 'postgres',
                password: 'qwerty78',
                database: 'rest',
                entities: [user_1.Users, primary_folder_1.Primary_Folder, secondary_folder_1.Secondary_Folder, tertiary_folder_1.Tertiary_Folder, request_details_1.Request_Details],
                synchronize: true
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: 'Just a testing server secret',
                signOptions: { expiresIn: '2592000s' },
            }),
        ],
        controllers: [user_controller_1.AppController, primaryFolder_controller_1.PrimaryFolderController, secondaryFolder_controller_1.SecondaryFolderController, tertiaryFolder_controller_1.TertiaryFolderController],
        providers: [app_service_1.AppService, bcrypt_setup_1.AuthService, auth_service_1.JwtMiddleWareService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map