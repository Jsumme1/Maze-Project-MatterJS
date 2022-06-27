const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse} = Matter;

const width = 800;
const height= 600;

const engine = Engine.create();
const { world } = engine;

// generates canvas element
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width,
        height
    }
});

// generates "world" black box 800X600
Render.run(render);
Runner.run(Runner.create(), engine);

World.add(world, MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
    })
);

// Walls
const walls = [
  Bodies.rectangle(400, 0, 800, 40, { isStatic: true }),
  Bodies.rectangle(400, 600, 800, 40, { isStatic: true }),
  Bodies.rectangle(0, 300, 40, 600, { isStatic: true }),
  Bodies.rectangle(800, 300, 40, 600, { isStatic: true }),
];

World.add(world, walls);

// Random Shapes

for (let i=0; i< 20; i++){
    if(Math.random () > 0.5) {
        World.add(world, Bodies.rectangle (Math.random() * width, Math.random() * height, 50, 50));
    } else {
        World.add(world, Bodies.circle(Math.random() * width, Math.random() * height, 35, {
            render: {
                fillStyle: "green"
            }
        })
        );
    }
};




// //  generates shape in black box world first 2 numbers are where shape is placed, then ht wdth
// const shape = Bodies.rectangle(200, 200, 50, 50, {
//     // isStatic - holds shape in place in world
//     isStatic: true
// });
// adds shape to world object
// World.add(world, shape);
