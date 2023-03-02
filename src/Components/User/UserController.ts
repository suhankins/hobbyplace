import { UserModel } from "../shared/Models";

export const UserController = {
    async getByEmail(email: string) {
        return UserModel.findOne({email: email});
    },
};
