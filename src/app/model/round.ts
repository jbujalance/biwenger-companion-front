import { IStanding } from "./standing";

export interface IRound {
    roundName: string,
    date: Date,
    standings: IStanding[]
}