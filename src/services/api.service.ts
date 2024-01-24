import axios from "axios";
import { parseCookies } from "nookies";

export function getApi(ctx?: any) {
    const { 'access_token': token } = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'https://hottickets.com.br/'
    })
    if (token) api.defaults.headers['Authorization'] = `Bearer ${token.replaceAll('"', '')}`;

    console.log(api.defaults.headers['Authorization']);
    return api;
}
export const api = getApi();