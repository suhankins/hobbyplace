import { getModelForClass } from "@typegoose/typegoose";
import { CollectionClass } from "../Collection/Collection";
import { ItemClass } from "../Item/Item";
import { UserClass } from "../User/User";

export const CollectionModel = getModelForClass(CollectionClass);
export const ItemModel = getModelForClass(ItemClass);
export const UserModel = getModelForClass(UserClass);
