class Cannon {
  constructor(x, y, width, height, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.cannonImage = loadImage("assets/cannon.png");
    this.cannonImageBase = loadImage("assets/cannonBase.png");
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.cannonImage, 0, 0, this.width, this.height);
    pop();

    image(this.cannonImageBase, 70, 20, 200, 200);
    noFill();

    if(keyIsDown(DOWN_ARROW) && this.angle<80) {
      this.angle=this.angle+1
    };
    if(keyIsDown(UP_ARROW) && this.angle>-30) {
      this.angle=this.angle-1
    };
  }
}
