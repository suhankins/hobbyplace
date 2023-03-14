import { UserModel } from "../Models";

export const UserController = {
    async getByEmail(email: string) {
        return UserModel.findOne({email: email});
    },
};
