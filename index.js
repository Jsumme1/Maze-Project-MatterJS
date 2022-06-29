const { Engine, Render, Runner, World, Bodies} = Matter;

const width = 600;
const height= 600;
// number of cells along vertical or horizontal edge
const cells = 3;


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

// Maze Generation - actual

// shuffle function to randomize array value picking for neighbors below
const shuffle = (arr) => {
    let counter = arr.length;

    while(counter > 0) {
    const index = Math.floor(Math.random()*counter);
    
    counter --;

    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
    }

    return arr
};


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

// random starting coordinates

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);


// drawing grid

const stepThroughCell = (row, column) => {
    // if I have visited the cell at [row, column] then return
    if(grid[row] [column]) {
        return;
    }

    // mark this cell as been visited - update element to true

    grid[row] [column] = true;

    // assemble randomly-ordered list of neighbors
    const neighbors = shuffle([
        [row-1, column, "up"],
        [row, column+1, "right"],
        [row +1, column, "down"],
        [row, column -1, "left"]
    ]);
   
    // For each neighbor...
    for (let neighbor of neighbors) {
        const [nextRow, nextColumn, direction] = neighbor;
   // see if that neighbor is out of bounds
  if(nextRow <0 || nextRow >= cells || nextColumn <0 || nextColumn >= cells){
    continue;

  }

    // if we have visited that neighbor, continue to next neighbor

    if (grid[nextRow][nextColumn]){
        continue;
    }

    //  remove a wall from either verticals or horizontals array
    if(direction === "left"){
        verticals[row] [column-1] = true;
    } else if (direction === "right"){
        verticals[row] [column]= true;
    } else if (direction === "up") {
          horizontals[row-1][column] = true;
    } else if (direction === "down") {
          horizontals[row][column] = true;
    }
 //  Visit that next cell ( previous 2 checks passed) 
    stepThroughCell(nextRow,nextColumn);
  }   
};

stepThroughCell(startRow, startColumn);

horizontals.forEach(row => {
    row.forEach((open) =>{
    if (open){
        return;
    }

    const wall = Bodies.rectangle();
});
});
