import {
    modelOptions,
    prop,
    PropType,
    defaultClasses,
    mongoose,
} from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose';
import '../../lib/mongodb';
import { validateArrayLength } from '@/lib/validateArrayLength';
import { ItemClass } from '../Item/Item';
import { UserClass } from '../User/User';

@modelOptions({
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
})
export class CollectionClass implements defaultClasses.Base {
    static FIELDS = 6;

    @prop()
    public _id!: mongoose.Types.ObjectId;

    @prop()
    public id!: string;

    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public description!: string;

    @prop({ default: () => null })
    public image?: string;

    @prop({ required: true })
    public category!: string;

    @prop({ default: () => Date.now() })
    public created?: number;

    @prop({ default: () => Date.now() })
    public updated?: number;

    @prop({ ref: () => UserClass, required: true })
    public owner!: Ref<UserClass>;

    @prop(
        {
            type: () => [String],
            required: true,
            validate: [validateArrayLength(1, CollectionClass.FIELDS)],
        },
        PropType.ARRAY
    )
    public fields!: string[];

    @prop({
        ref: () => ItemClass,
        foreignField: 'belongsTo',
        localField: '_id',
    })
    public items?: Ref<ItemClass>[];

    public get itemCount() {
        return this.items?.length;
    }
}
