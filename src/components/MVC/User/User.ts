import {
    defaultClasses,
    modelOptions,
    mongoose,
    prop,
} from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose';
import '../../../lib/mongodb';
import { CollectionClass } from '../Collection/Collection';
import { EmailPattern } from '../../../lib/EmailPattern';

@modelOptions({
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
})
export class UserClass implements defaultClasses.Base {
    public _id!: mongoose.Types.ObjectId;

    public id!: string;

    @prop({ required: true, unique: true })
    public name!: string;

    @prop({
        required: true,
        unique: true,
        validate: {
            validator: (v: string) => EmailPattern.test(v),
            message: 'not a valid email!',
        },
    })
    public email!: string;

    @prop({ required: true })
    public passwordHash!: string;

    @prop({ default: 'user' })
    public role?: 'user' | 'admin';

    @prop({
        ref: () => CollectionClass,
        foreignField: 'owner',
        localField: '_id',
    })
    public collections?: Ref<CollectionClass>[];
}
