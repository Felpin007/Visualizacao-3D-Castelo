let camX = 200, camY = -200, camZ = 200;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(135, 206, 235); // sky
    camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);
    drawSea();
    drawIsland();
    drawCastle();

    // Draw the first flower
    drawFlower();

// Draw the second flower to the left of the castle
push();
translate(30, 30, -10);
rotateY(radians(90)); // Rotate 90 degrees around the Y axis
drawFlower();
pop();

// Draw the third flower to the right of the castle
push();
translate(10, 10, 0);
rotateY(radians(180)); // Rotate 180 degrees around the Y axis (turn around)
drawFlower();
pop();
}

  function drawSea() {
    push(); // Save the current transformation
    translate(0, -50, 0); // Move up by 50 units
    fill(0, 0, 255); // sea color
  
    // Draw waves
    for (let x = -250; x <= 250; x += 20) {
      for (let z = -250; z <= 250; z += 20) {
        // Calculate wave height
        let y = 10 * sin(frameCount * 0.02 + sqrt(x * x + z * z) * 0.02);
        push();
        translate(x, y, z);
        box(20, 10, 20);
        pop();
      }
    }
  
    pop(); // Restore the transformation
  }
  
  function drawIsland() {
    push();
    noStroke(); // disable drawing the outline
    translate(0, -50, 0);
    fill(34, 139, 34); // island
    ellipsoid(100, 50, 100);
    pop();
  }
  
  function drawCastle() {
    push();
    translate(0, -100, 0);
    fill(20, 20, 20); // almost black castle
    box(50, 100, 50); // main building
    translate(0, -75, 0);
    rotateX(PI);
    fill(128, 0, 0); // wine-colored roof
    cone(50, 50); // wider roof
    pop();
  }
  
  function keyPressed() {
    const speed = 10;
    if (keyCode === UP_ARROW) {
        camZ -= speed;
    } else if (keyCode === DOWN_ARROW) {
        camZ += speed;
    } else if (keyCode === LEFT_ARROW) {
        camX -= speed;
    } else if (keyCode === RIGHT_ARROW) {
        camX += speed;
    }
}

function mouseDragged() {
    const sensitivity = 0.5;
    camX -= (pmouseX - mouseX) * sensitivity;
    camY += (pmouseY - mouseY) * sensitivity;
}

function drawFlower() {
    push();
    translate(-50, -100, 0); // Move the flower to a suitable position

    // Draw the stem
    fill(34, 139, 34); // green
    for (let i = 0; i < 5; i++) {
        push();
        rotateZ(-i * 0.1); // Rotate each segment to make the stem look "crooked"
        translate(0, i * -20, 0); // Move each segment up
        cylinder(5, 20); // Draw a segment of the stem
        pop();
    }

    // Draw the flower
    translate(-38, -100, 0); // Move to the top of the stem
    fill(128, 0, 128); // purple
    sphere(20); // Draw the flower
    pop();
}