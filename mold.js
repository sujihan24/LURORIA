/*
----- Coding Tutorial by Patt Vira ----- 
Name: Slime Molds (Physarum)
Video Tutorial: https://youtu.be/VyXxSNcgDtg

References: 
1. Algorithm by Jeff Jones: https://uwe-repository.worktribe.com/output/980579/characteristics-of-pattern-formation-and-evolution-in-approximations-of-physarum-transport-networks

Connect with Patt: @pattvira
https://www.pattvira.com/
----------------------------------------
*/

let molds = []; 
let num = 4000;
let d; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  d = pixelDensity();
  
  for (let i = 0; i < num; i++) {
    molds[i] = new Mold();
  }
}

function draw() {
  background(0, 5);
  loadPixels();
  
  for (let i = 0; i < num; i++) {
    molds[i].update();
    molds[i].display();
  }
}

// Mold 클래스 정의
class Mold {
  constructor() {
    this.x = random(width / 2 - 20, width / 2 + 20);
    this.y = random(height / 2 - 20, height / 2 + 20);
    this.r = 0.5;
    
    this.heading = random(360);
    this.vx = cos(this.heading);
    this.vy = sin(this.heading);
    this.rotAngle = 45;
    
    this.rSensorPos = createVector(0, 0);
    this.lSensorPos = createVector(0, 0);
    this.fSensorPos = createVector(0, 0);
    this.sensorAngle = 45;
    this.sensorDist = 10;
  }
  
  update() {   		
    this.vx = cos(this.heading);
    this.vy = sin(this.heading);
    
    this.x = (this.x + this.vx + width) % width;
    this.y = (this.y + this.vy + height) % height;
    
    this.getSensorPos(this.rSensorPos, this.heading + this.sensorAngle);
    this.getSensorPos(this.lSensorPos, this.heading - this.sensorAngle);
    this.getSensorPos(this.fSensorPos, this.heading);
  
    let index, l, r, f;
    index = 4 * (d * floor(this.rSensorPos.y)) * (d * width) + 4 * (d * floor(this.rSensorPos.x));
    r = pixels[index] || 0;
    
    index = 4 * (d * floor(this.lSensorPos.y)) * (d * width) + 4 * (d * floor(this.lSensorPos.x));
    l = pixels[index] || 0;
    
    index = 4 * (d * floor(this.fSensorPos.y)) * (d * width) + 4 * (d * floor(this.fSensorPos.x));
    f = pixels[index] || 0;
    
    if (f > l && f > r) {
      this.heading += 0;
    } else if (f < l && f < r) {
      this.heading += random(1) < 0.5 ? this.rotAngle : -this.rotAngle;
    } else if (l > r) {
      this.heading -= this.rotAngle;
    } else if (r > l) {
      this.heading += this.rotAngle;
    }
  }
  
  display() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
  
  getSensorPos(sensor, angle) {
    sensor.x = (this.x + this.sensorDist * cos(angle) + width) % width;
    sensor.y = (this.y + this.sensorDist * sin(angle) + height) % height;
  }
}
