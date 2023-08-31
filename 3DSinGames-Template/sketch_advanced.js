let angle = 0;
let radius = 800;
let confLocs = []; // Array to store confetti locations
let confTheta = []; // Array to store initial angles of confetti
let gridSizeSlider, waveSpeedSlider, cubeHeightSlider;

function setup() {
    createCanvas(900, 800, WEBGL);

    gridSizeSlider = createSlider(10, 100, 50); // Slider for cube grid size
    gridSizeSlider.position(10, height + 10);

    waveSpeedSlider = createSlider(0.1, 2, 1, 0.01); // Slider for sine wave speed
    waveSpeedSlider.position(10, height + 40);

    cubeHeightSlider = createSlider(50, 300, 150); // Slider for cube height
    cubeHeightSlider.position(10, height + 70);

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
    angleMode(DEGREES);

    // Calculate camera position
    let cameraX = radius * cos(angle);
    let cameraZ = radius * sin(angle);
    camera(cameraX, -600, cameraZ, 0, 0, 0, 0, 1, 0); // Set camera position and orientation

    // Draw boxes with lights and materials
    drawBoxes();

    // Call the confetti function
    confetti();

    // Update cube grid size, wave speed, and cube height
    let gridSize = gridSizeSlider.value();
    let waveSpeed = waveSpeedSlider.value();
    let cubeHeight = cubeHeightSlider.value();

    // Draw sliders
    fill(255);
    textSize(16);
    text(`Cube Grid Size: ${gridSize}`, gridSizeSlider.x * 2 + gridSizeSlider.width, height + 25);
    text(`Wave Speed: ${waveSpeed.toFixed(2)}`, waveSpeedSlider.x * 2 + waveSpeedSlider.width, height + 55);
    text(`Cube Height: ${cubeHeight}`, cubeHeightSlider.x * 2 + cubeHeightSlider.width, height + 85);
}

function drawBoxes() {
    pointLight(255, 255, 255, 0, 0, 800); // Add a point light

    let gridSize = gridSizeSlider.value();
    let waveSpeed = waveSpeedSlider.value();
    let cubeHeight = cubeHeightSlider.value();

    let range = 400;

    for (let x = -range; x <= range; x += gridSize) {
        for (let z = -range; z <= range; z += gridSize) {
            let distance = dist(x, z, 0, 0); // Calculate distance from the center
            let length = map(sin(distance + frameCount * waveSpeed), -1, 1, 100, cubeHeight);
            
            push(); // Save the current transformation
            translate(x, 0, z); // Move to the current grid position
            box(gridSize, length, gridSize); // Create a box with modulated height
            pop(); // Restore the previous transformation
        }
    }

    // for (let x = -400; x <= 400; x += gridSize) {
    //     for (let z = -400; z <= 400; z += gridSize) {
    //         push();
    //         translate(x, 0, z);
    //         let distance = dist(x, z, 0, 0);
    //         let length = map(sin(distance + frameCount * waveSpeed), -1, 1, 100, cubeHeight);
            
    //         // Apply different materials to cubes and confetti
    //         if (length === cubeHeight) {
    //             specularMaterial(255); // Material for cubes
    //         } else {
    //             ambientMaterial(255, 255, 0); // Material for confetti
    //         }
            
    //         box(gridSize, length, gridSize);
    //         pop();
    //     }
    // }
}

function confetti() {
    noStroke();
    ambientMaterial(255, 255, 0); // Yellow material for confetti

    for (let i = 0; i < confLocs.length; i++) {
        let confLocation = confLocs[i];
        let theta = confTheta[i];

        push();
        translate(confLocation.x, confLocation.y, confLocation.z);
        rotateY(theta);
        plane(15, 15);
        pop();

        confLocation.y += 1;
        theta += 10;

        if (confLocation.y > 0) {
            confLocation.y = -800;
        }

        confTheta[i] = theta;
    }
}
