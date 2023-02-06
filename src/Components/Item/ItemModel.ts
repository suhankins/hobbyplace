import { prop, getModelForClass } from '@typegoose/typegoose';
import "../../lib/mongodb";

export class ItemClass {
    @prop()
    public name!: string;
}

export const ItemModel = getModelForClass(ItemClass);
