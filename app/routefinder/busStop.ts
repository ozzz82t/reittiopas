import { Road } from "./road";

export class BusStop {

    constructor(public name:string, public roads: Road[], public lines: any) {}
}