let angle = 0;
let radius = 800;

let confLocs = []; // Array to store confetti locations
let confTheta = []; // Array to store initial angles of confetti



function setup() {
    createCanvas(900, 800, WEBGL);
    // Populate confLocs and confTheta arrays
    for (let i = 0; i < 200; i++) {
        let x = random(-500, 500);
        let y = random(-800, 0);
        let z = random(-500, 500);
        confLocs.push(createVector(x, y, z));
        confTheta.push(random(360));
    }
}

function draw() {
    background(125);
    orbitControl();
    angleMode(DEGREES);

    // Calculate camera position
    let cameraX = radius * cos(angle);
    let cameraZ = radius * sin(angle);
    camera(cameraX, -600, cameraZ, 0, 0, 0, 0, 1, 0); // Set camera position and orientation

    // Set material to normal and stroke to zero
    normalMaterial();
    noStroke();

    // Set stroke weight
    strokeWeight(2);

    // Nested loop to create a grid of boxes
    let gridSize = 50;
    let range = 400;

    for (let x = -range; x <= range; x += gridSize) {
        for (let z = -range; z <= range; z += gridSize) {
            let distance = dist(x, z, 0, 0); // Calculate distance from the center
            let length = map(sin(distance + frameCount), -1, 1, 100, 300); // Modulate height using sin()

            push(); // Save the current transformation
            translate(x, 0, z); // Move to the current grid position
            box(gridSize, length, gridSize); // Create a box with modulated height
            pop(); // Restore the previous transformation
        }
    }

    angle += 0.5; // Increment the angle to make the camera move around in a circle

    // Call the confetti function
    confetti();

    // Update camera angle based on mouse position
    let horizontalMouse = map(mouseX, 0, width, -180, 180);
    angle = horizontalMouse;
}


// function confetti() {
//     for (let i = 0; i < confLocs.length; i++) {
//         let confLocation = confLocs[i];
//         let theta = confTheta[i];

//         push();
//         translate(confLocation.x, confLocation.y, confLocation.z);
//         rotateY(theta);

//         let r = map(confLocation.x, -500, 500, 0, 255);
//         let g = map(confLocation.y, -800, 0, 0, 255);
//         let b = map(confLocation.z, -500, 500, 255, 0);
//         ambientMaterial(r, g, b); // Set material color based on position

//         plane(15, 15);

//         pop();

//         confLocation.y += 1;
//         theta += 10;

//         if (confLocation.y > 0) {
//             confLocation.y = -800;
//         }

//         confTheta[i] = theta;
//     }
// }

function confetti() {
    noStroke();
    fill(255, 255, 0); // Yellow color for confetti

    for (let i = 0; i < confLocs.length; i++) {
        let confLocation = confLocs[i];
        let theta = confTheta[i];

        push(); // Save the current transformation
        translate(confLocation.x, confLocation.y, confLocation.z); // Move to confetti location
        rotateY(theta); // Rotate by the corresponding angle

        // Draw a plane representing confetti
        plane(15, 15);

        pop(); // Restore the previous transformation

        // Update confetti animation
        confLocation.y += 1; // Move downwards
        theta += 10; // Spin

        // Check if confetti has reached the middle of the world
        if (confLocation.y > 0) {
            confLocation.y = -800; // Reset to the top
        }

        // Update the theta value in the array
        confTheta[i] = theta;
    }
}

/**
 * 2 additional enhancements: changing materials and adding interactivity. 
- Changing Materials:
    I'll modify the confetti to use different materials for a more dynamic look. 
    I'll apply colors to the planes of the confetti to create a colorful effect.

- Interactivity:
I'll add interactivity by allowing users to control the speed and 
direction of the camera's movement around the grid of boxes. 
The camera's movement will change based on the mouse's horizontal position on the canvas.
 */