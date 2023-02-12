import {
    prop,
    getModelForClass,
    PropType,
    Severity,
} from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose';
import '../../lib/mongodb';
import {
    CollectionClass,
    CollectionModel,
} from '../Collection/CollectionModel';
import { validateArrayLength } from '../shared/validateArrayLength';
import { ItemField } from '../Fields/ItemField';

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
    // Fields require a lot of validation that can only be done after belongsTo is resolved
    public fields!: ItemField[];

    static async ValidateFields(
        belongsTo: Ref<CollectionClass>,
        fields: ItemField[]
    ): Promise<boolean> {
        const collection = await CollectionModel.findById(belongsTo);
        if (
            collection !== null &&
            collection !== undefined &&
            collection.fields.length === fields.length
        ) {
            return collection.fields.every(
                (value, index) => fields[index].type === value
            );
        }
        return false;
    }
}

export const ItemModel = getModelForClass(ItemClass);
