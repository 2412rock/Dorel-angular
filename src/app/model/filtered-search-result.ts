import { Imagine } from "./Imagine";

export class FilteredSearchResult{
    public userName: string;

    public userId: number;

    public descriere: string;

    public serviciuName: string;

    public serviciuId: number;

    public judetIds: number[];

    public judetNames: string[];

    public starsAverage: number;

    public imagineCover: Imagine;
}