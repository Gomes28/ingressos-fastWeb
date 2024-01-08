export interface IUser {
    name: string;
    email: string;
    cpf: string;
    telefone: string;
    password?: string;
    role?: Array<string>;
}