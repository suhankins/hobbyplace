import { mongoose, prop, Severity } from '@typegoose/typegoose';

export class ItemField {
    @prop({ required: true })
    public type!: string;

    @prop({
        required: true,
        allowMixed: Severity.ALLOW,
        type: () => mongoose.Schema.Types.Mixed,
    })
    public value!: any;
}
