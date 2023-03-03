import { defaultClasses, mongoose, prop, PropType } from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose';
import '../../lib/mongodb';
import { CollectionClass } from '../Collection/Collection';
import { ItemField } from '../Fields/modelFields/ItemField';

export class ItemClass implements defaultClasses.Base {
    public _id!: mongoose.Types.ObjectId;

    public id!: string;

    @prop({ required: true })
    public name!: string;

    @prop({ default: () => null })
    public image?: string;

    @prop({ default: () => Date.now() })
    public created?: number;

    @prop({ default: () => Date.now() })
    public updated?: number;

    @prop({ type: () => [String], default: () => [] }, PropType.ARRAY)
    public tags?: string[];

    @prop({ ref: () => CollectionClass, required: true })
    public belongsTo!: Ref<CollectionClass>;

    @prop(
        {
            type: () => [ItemField],
            _id: false,
            required: true,
        },
        PropType.ARRAY
    )
    public fields!: ItemField[];
}
