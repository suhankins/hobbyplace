import { defaultClasses, mongoose, prop, Severity } from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose';
import { CollectionField } from './CollectionField';

export class ItemField {
    @prop({ ref: () => CollectionField, required: true })
    public belongsTo!: Ref<CollectionField>;

    @prop({
        required: true,
        allowMixed: Severity.ALLOW,
        type: () => mongoose.Schema.Types.Mixed,
    })
    public value!: any;
}
