import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { RequestBody } from "models/request_body";

@Injectable()
export class RequestBodyService {
    constructor(@InjectModel(RequestBody.name) private requestBodyModel: Model<RequestBody>) {}

    async create(request_body: RequestBody): Promise<RequestBody> {
        const createdRequestBody = new this.requestBodyModel(request_body);
        
        return createdRequestBody.save();
    }

    async findAll(): Promise<RequestBody[]> {
        return this.requestBodyModel.find().exec();
    }

    async find(request_id: number): Promise<RequestBody[]> {
        return this.requestBodyModel.find({request_id: request_id}).exec();
    }

    async update(request_id: number, body_content: object){
        return this.requestBodyModel.updateOne({request_id: request_id}, body_content);
    }
}