import { NextApiRequest, NextApiResponse } from "next";
import { ItemClass, ItemModel } from "../../../Components/Item/ItemModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ItemClass>) {
    res.status(200).json(await ItemModel.create({ name: "Steve" }));
}