export interface IUserDetails {
    _id: string,
    email: string,
    name: string,
    roles: string[],
    exp: number,
    iat: number
}