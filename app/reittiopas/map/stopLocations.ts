const locations = [
    {name: 'A', x: 68, y: 24 },
    {name: 'B', x: 20, y: 72 },
    {name: 'C', x: 164, y: 72 },
    {name: 'D', x: 116, y: 120 },
    {name: 'E', x: 212, y: 120 },
    {name: 'F', x: 212, y: 168 },
    {name: 'G', x: 212, y: 216 },
    {name: 'H', x: 282, y: 216 },
    {name: 'I', x: 282, y: 264 },
    {name: 'J', x: 282, y: 312 },
    {name: 'K', x: 212, y: 312 },
    {name: 'L', x: 212, y: 360 },
    {name: 'M', x: 212, y: 408 },
    {name: 'N', x: 212, y: 456 },
    {name: 'O', x: 212, y: 504 },
    {name: 'P', x: 164, y: 504 },
    {name: 'Q', x: 164, y: 456 },
    {name: 'R', x: 116, y: 445 },
];

export function locateClick(x: number, y: number, radius: number): string | null{
    
    let stop = null;

    for (const location of locations){
        const originX = location.x - radius;
        const originY = location.y + radius;
        const endX = location.x + radius;
        const endY = location.y - radius;

        if ((x > originX && x < endX) && (y < originY && y > endY)){
            return location.name;
        }
    }

    return stop;
}
