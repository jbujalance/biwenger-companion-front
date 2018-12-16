export interface IUserDetails {
    _id: string,
    email: string,
    name: string,
    roles: string[],
    lastActivity: Date,
    exp: number,
    iat: number
}