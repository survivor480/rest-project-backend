import {DataSource} from "typeorm";
import { Users } from "../models/user";
import { Primary_Folder } from "../models/primary_folder";
import { Request_Details } from "./request_details";
import { Secondary_Folder } from "./secondary_folder";
import { Tertiary_Folder } from "./tertiary_folder";
import { Workspace } from "./workspace";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "172.17.0.1",
    port: 3301,
    username: "rest",
    password: "qwerty78",
    database: "rest",
    entities: [Users, Primary_Folder, Request_Details, Secondary_Folder, Tertiary_Folder, Workspace]
});

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!")
}).catch((err) => {
    console.log("Error during Data Source initialization", err);
});

export const ConnectionPoint = AppDataSource;