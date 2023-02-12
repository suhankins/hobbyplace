import { prop, getModelForClass, PropType } from '@typegoose/typegoose';
import '../../lib/mongodb';
import { validateArrayLength } from '@/Components/shared/validateArrayLength';

export class CollectionClass {
    static FIELDS = 6;

    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public description!: string;

    @prop({ default: () => '/NOIMAGE.png' })
    public image?: string;

    @prop({ required: true })
    public category!: string;

    @prop({ default: () => Date.now() })
    public created?: number;

    @prop({ default: () => Date.now() })
    public updated?: number;

    @prop(
        {
            type: () => [String],
            required: true,
            validate: [validateArrayLength(1, CollectionClass.FIELDS)],
        },
        PropType.ARRAY
    )
    public fields!: string[];
}

export const CollectionModel = getModelForClass(CollectionClass);
