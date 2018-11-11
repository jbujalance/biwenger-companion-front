import { IMarketPlayer } from "./market-player";
import { IMarketUser } from "./market-user";

export interface IMarketSale {
    price: number,
    date: Date,
    until: Date,
    plater: IMarketPlayer,
    user: IMarketUser
}
