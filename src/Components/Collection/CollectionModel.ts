import { prop, getModelForClass, PropType } from '@typegoose/typegoose';
import '../../lib/mongodb';

export class CollectionClass {
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

    @prop({ type: () => [String], required: true }, PropType.ARRAY)
    public fields!: string[];
}

export const CollectionModel = getModelForClass(CollectionClass);
