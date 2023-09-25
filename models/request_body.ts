import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { HydratedDocument } from "mongoose";

export type RequestBodyDocument = HydratedDocument<RequestBody>

@Schema()
export class RequestBody {
    @Prop()
    body_type: string

    @Prop()
    body_structure_type: string

    @Prop({ type: Object})
    body_content: object

    @Prop()
    request_id: number
}

export const RequestBodySchema = SchemaFactory.createForClass(RequestBody);