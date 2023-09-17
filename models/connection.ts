import {DataSource} from "typeorm";
import { Users } from "../models/user";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 1501,
    username: "postgres",
    password: "qwerty78",
    database: "rest",
    entities: [Users]
});

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!")
}).catch((err) => {
    console.log("Error during Data Source initialization", err);
});

export const ConnectionPoint = AppDataSource;