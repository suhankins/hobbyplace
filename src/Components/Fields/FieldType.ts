import { defaultClasses, mongoose, prop } from "@typegoose/typegoose";

export class FieldType implements defaultClasses.Base {
    public _id!: mongoose.Types.ObjectId;
    public id!: string;

    @prop({required: true})
    type!: string;
    @prop({required: true})
    name!: string;
}