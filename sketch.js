// Menger Sponge Fractal

// Rotation direction and speed
const rotation = [0, 0, 0];
const rotationSpeed = [0.01, 0.004, 0.001];
// Array to boxes
var sponge = [];

// Class used to manage Menger Sponge Fractal's Boxes
class Box {
  // Default constructor
  constructor(x, y, z, size) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
  }
  
  // Method used to draw box
  show() {
    push();
    
    translate(this.x, this.y, this.z);
    
    // Draw box
    box(this.size);
    
    pop();
  }
  
  // Method used to generate more boxes
  generate() {
    // New boxes
    const boxes = [];

    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        for (var k = -1; k < 2; k++) {
          const sum = abs(i) + abs(j) + abs(k);

          // Only create box if it's not a center box
          if (sum > 1) {
            const newSize = this.size/3;
            boxes.push(new Box(this.x + i*newSize, this.y + j*newSize,
                               this.z + k*newSize, newSize));
          }
        }
      }
    }
    
    return boxes;
  }
}


function setup() {
  createCanvas(480, 640, WEBGL);
  sponge.push(new Box(0, 0, 0, 200));
}

function mousePressed() {
  // Restart to avoid excess boxes
  if (sponge.length > 27) {
    sponge = [];
    sponge.push(new Box(0, 0, 0, 200));
  } else {
    // Create new boxes for each box
    const next = [];
    for (const box of sponge) {
      Array.prototype.push.apply(next, box.generate());
    }
    sponge = next;
  }
}

function draw() {
  background(51);
  stroke(255);
  fill(255);
  lights();
  
  // Rotate box
  rotateX(rotation[0]);
  rotateY(rotation[1]);
  rotateZ(rotation[2]);
  
  rotation[0] += rotationSpeed[0];
  rotation[1] += rotationSpeed[1];
  rotation[2] += rotationSpeed[2];

  // Draw each box
  for (const box of sponge) {
    box.show();
  }
}