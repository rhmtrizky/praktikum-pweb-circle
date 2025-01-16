export interface IUser {
    id: number,
    username?: string,
    full_name?: string,
    password: string,
    picture: string,
    description?: string
}

export interface IUserRegister {
    username: string,
    full_name: string,
    email: string,
    password: string,
}

export interface IUserLogin {
    email: string,
    password: string,
}