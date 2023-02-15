import { getModelForClass } from "@typegoose/typegoose";
import { CollectionClass } from "../Collection/Collection";
import { ItemClass } from "../Item/Item";

export const CollectionModel = getModelForClass(CollectionClass);
export const ItemModel = getModelForClass(ItemClass);
