import { IFormelloRow } from "./IFormelloRow.interface";

export interface IFormelloConfig<T> {
    model: T,
    rows: Array<IFormelloRow>
}