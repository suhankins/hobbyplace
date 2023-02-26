import { compare } from 'bcrypt';
import { UserModel } from '../shared/Models';

export const UserController = {
    async auth(username: string, password: string) {
        const user = await UserModel.findOne({ username: username });
        if (user === null) {
            return null;
        }

        const isValid = await compare(password, user.passwordHash);
        if (isValid) {
            return user;
        }

        return null;
    },
};
