"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionPoint = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../models/user");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 1501,
    username: "postgres",
    password: "qwerty78",
    database: "rest",
    entities: [user_1.Users]
});
AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
}).catch((err) => {
    console.log("Error during Data Source initialization", err);
});
exports.ConnectionPoint = AppDataSource;
//# sourceMappingURL=connection.js.map