const { Engine, Render, Runner, World, Bodies} = Matter;

const width = 600;
const height= 600;
// number of cells along vertical or horizontal edge
const cells = 5;


const engine = Engine.create();
const { world } = engine;

// generates canvas element
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: true,
        width,
        height
    }
});

// generates "world" black box 800X600
Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
const walls = [
  Bodies.rectangle(width/2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width /2 , height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height /2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height/2, 40, height, { isStatic: true }),
];

World.add(world, walls);

// Maze generation - grid generation - initialize at all false. true false indicates whether it has been "visited" or not

// basic grid generation - not using b/c too many variables floating around 
// const grid =[];

// for (let i=0; i<3; i++) {
//     grid.push([]);
// loop within generates second dimension with values of false
    // for (let j=0; j<3; j++){
//         grid[i].push(false);
//     }
// }

// Preferred grid generation method



const grid = Array (cells)
    .fill(null)
    // generates columns
    .map(()=> Array(cells).fill(false));


const verticals = Array (cells)
.fill(null)
.map(()=> Array(cells-1).fill(false));

const horizontals = Array(cells-1)
.fill(null)
.map(() => Array(cells).fill(false));

console.log(grid);
console.log(verticals);
console.log(horizontals);
