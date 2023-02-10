import {
    prop,
    getModelForClass,
    PropType,
    mongoose,
} from '@typegoose/typegoose';
import '../../lib/mongodb';

export class ItemClass {
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

    @prop(
        { type: () => [{ field: String, value: mongoose.Schema.Types.Mixed }] },
        PropType.ARRAY
    )
    public fields!: [{ field: string; value: any }];

    @prop({ required: true })
    public belongsTo!: mongoose.Types.ObjectId;
}

export const ItemModel = getModelForClass(ItemClass);
