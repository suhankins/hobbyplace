import { defaultClasses, mongoose, prop, Severity } from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose';
import { CollectionField } from './CollectionField';

export class ItemField implements defaultClasses.Base {
    public _id!: mongoose.Types.ObjectId;
    public id!: string;

    @prop({ ref: () => CollectionField, required: true })
    public belongsTo!: Ref<CollectionField>;

    @prop({ required: true })
    public type!: string;

    @prop({
        required: true,
        allowMixed: Severity.ALLOW,
        type: () => mongoose.Schema.Types.Mixed,
    })
    public value!: any;
}
