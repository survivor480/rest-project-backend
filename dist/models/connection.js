"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionPoint = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../models/user");
const primary_folder_1 = require("../models/primary_folder");
const request_details_1 = require("./request_details");
const secondary_folder_1 = require("./secondary_folder");
const tertiary_folder_1 = require("./tertiary_folder");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 3301,
    username: "postgres",
    password: "qwerty78",
    database: "rest",
    entities: [user_1.Users, primary_folder_1.Primary_Folder, request_details_1.Request_Details, secondary_folder_1.Secondary_Folder, tertiary_folder_1.Tertiary_Folder]
});
AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
}).catch((err) => {
    console.log("Error during Data Source initialization", err);
});
exports.ConnectionPoint = AppDataSource;
//# sourceMappingURL=connection.js.map