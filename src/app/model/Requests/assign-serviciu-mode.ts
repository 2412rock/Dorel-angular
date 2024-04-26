import { Imagine } from "../Imagine";
import { ImaginiServiciiDescriere } from "../imagine-servicii-descriere";

export class AssignServiciuRequest{
    public serviciuId: number;
    public judeteIds: number[];
    public imagini: Imagine[];
    public descriere: string;
    public ofer: boolean;
    public phone: string | null;
    public email: string | null;
}