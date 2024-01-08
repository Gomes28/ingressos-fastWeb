import { IUser } from "@/models/user.model";
import { api } from "./api.service";

export class AuthService {
    public static async signin(email: string, password: string) {
        try {
            const {access_token, user} = await api.post('user/login', {
                email,
                password
            }).then(res => res.data);

            if(!access_token) return null;
            return {
                access_token, user
            }
        } catch (error) {
            return null;   
        }
    }

    public static signup(user: IUser) {
        try {

        } catch (error) {

        }
    }
}