import {DataSource} from "typeorm";
import { Users } from "../models/user";
import { Primary_Folder } from "../models/primary_folder";
import { Request_Details } from "./request_details";
import { Secondary_Folder } from "./secondary_folder";
import { Tertiary_Folder } from "./tertiary_folder";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 3301,
    username: "postgres",
    password: "qwerty78",
    database: "rest",
    entities: [Users, Primary_Folder, Request_Details, Secondary_Folder, Tertiary_Folder]
});

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!")
}).catch((err) => {
    console.log("Error during Data Source initialization", err);
});

export const ConnectionPoint = AppDataSource;