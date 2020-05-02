import { BusStop } from "./busStop";
import { Road } from "./road";
import * as data from "./data/reittiopas.json";

interface Tie {
    mista: string;
    mihin: string;
    kesto: number;
}

export function stopFactory(): BusStop[] {
    const importedStops = data.pysakit;
    const importedLines = data.linjastot;

    const stops: BusStop[] = [];
    importedStops.forEach(stopId => {
        const foundRoads:Road[] = roadBuilder(stopId);
        let lines:any[] = [];
        for (let key in importedLines) {
            if (importedLines[key].includes(stopId)) {
                lines.push(key);
            }
        }
        stops.push(new BusStop(stopId, foundRoads, lines));
    });
    
    return stops;
}


function roadBuilder(stopId: string): Road[] {

    const importedRoads: Tie[] = data.tiet;
    const lines: string = [
        'xx', 
        ...data.linjastot.keltainen, 
        'xx', 
        ...data.linjastot.punainen, 
        'xx',
        ...data.linjastot.sininen,
        'xx',
        ...data.linjastot.vihreä].join('');

    const roads: Road[] = [];

    const filteredRoads: Tie[] =[];
    importedRoads.forEach(road=> {
        const normLineToSearch:string = road.mista + road.mihin;
        const reversedLineToSearch:string = road.mihin + road.mista;

        if(lines.includes(normLineToSearch) || lines.includes(reversedLineToSearch)) {
            filteredRoads.push(road);
        }
    });

    filteredRoads.forEach( (importedRoad: Tie) => {
        if(importedRoad.mista == stopId) {
            const foundRoad:Road = new Road(importedRoad.mihin, importedRoad.kesto);
            roads.push(foundRoad);
        }
        else if (importedRoad.mihin == stopId) {
            const foundRoad:Road = new Road(importedRoad.mista, importedRoad.kesto);
            roads.push(foundRoad);
        }
    });

    return roads;
}


export function getLinesBetweenStops(from: BusStop, to:BusStop): string[] {
    const importedLines = data.linjastot;
    const normLineToSearch: string = from.name + to.name;
    const reversedLineToSearch: string = to.name + from.name;

    const lineColors:string[] = [];

    for (const key in importedLines) {
        if (importedLines[key].join("").includes(normLineToSearch) || importedLines[key].join("").includes(reversedLineToSearch)) {
            lineColors.push(key);
        }
    }
    return lineColors;

}
