import { defaultClasses, mongoose, prop, Severity } from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose';
import { FieldType } from './FieldType';

export class ItemField implements defaultClasses.Base {
    public _id!: mongoose.Types.ObjectId;
    public id!: string;

    @prop({ ref: () => FieldType, required: true })
    public belongsTo!: Ref<FieldType>;

    @prop({ required: true })
    public type!: string;

    @prop({
        required: true,
        allowMixed: Severity.ALLOW,
        type: () => mongoose.Schema.Types.Mixed,
    })
    public value!: any;
}
