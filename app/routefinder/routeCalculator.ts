import { BusStop } from "./busStop";

export class RouteCalculator {
    
    constructor(private stops: BusStop[]) {}

    public findRoutes(from: BusStop, to: BusStop): BusStop[][] {
        return this.findAllRoutes(from, to);
    }

    public calculateFastestRoute(routes: BusStop[][]): BusStop[] {
        let fastestRoute:BusStop[] = routes[0];
        let fastestTime: number = this.calculateRouteTime(routes[0]);
        routes.forEach(route => {
            const routeTime:number = this.calculateRouteTime(route);
            if( routeTime < fastestTime) {
                fastestTime = routeTime;
                fastestRoute = route;
            }
        });
        return fastestRoute;
    }

    public calculateRouteTime(route:BusStop[]): number {
        let pathLength:number = 0;
        for(let i = 0; i < (route.length-1); i++) {
            pathLength = pathLength + this.calculateTimeBetweenStops(route[i],route[i+1])
        }
        return pathLength;
    }

    private calculateTimeBetweenStops(start: BusStop, end: BusStop): number {
        const rd = start.roads.find(road => road.nextStop == end.name);
        if (!rd) {
            throw new Error("road not found");
        }
        return rd.delay;
    }

    public getStop(stopId: string) {
        const found = this.stops.find(stop => stop.name == stopId)
        if (!found) {
            throw new Error("Bus stop not found");
        }
        return found;
    }

    private getNextStops(currentStop: BusStop) {
        const roads = currentStop.roads;
        const stops: BusStop[] = roads.map(road => {
            const stop = this.getStop(road.nextStop)
            return stop;
        });

        return stops;
    }

    private findAllRoutes(from: BusStop, to: BusStop){

        const allRoutes: BusStop[][] = [];
     
        const listRoutes = (currentStop: BusStop, stopsVisited: BusStop[]): BusStop[][] => {            stopsVisited.push(currentStop);
            let nextStops: BusStop[] = this.getNextStops(currentStop);
            nextStops = filter(stopsVisited, nextStops);

            if(nextStops.length == 0 ){
                return;
            }
            nextStops.forEach(stop => {
                if(stop == to){
                    allRoutes.push([...stopsVisited, stop]);
                }
                else {
                    listRoutes(stop, [...stopsVisited])
                }
            });
        };

        const filter = (alreadyStoppedAt: BusStop[], nextStops: BusStop[]) => {
            return nextStops.filter(next => {
                return !alreadyStoppedAt.includes(next);
            });
        };

        listRoutes(from, []);
        return allRoutes;

    }
}

