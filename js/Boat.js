class Boat {
    constructor(x,y,w,h,position,boatanimation) {
        this.body = Bodies.rectangle(x,y,w,h)
        this.w = w;
        this.h = h;
        this.position = position;
        //--this.boatImage = loadImage("assets/boat.png");
        this.animation = boatanimation;
        this.speed = 0.0784;
        this.isBroken = false;
        World.add(world,this.body);
    }

    remove(index) {
      this.animation = boatanimation;
      this.speed = 0.0784;
      this.width = 300;
      this.height = 300;
      this.isBroken = true;
        setTimeout(() => {
          Matter.World.remove(world, boatmatriz[index].body);
          delete boatmatriz[index];
        }, 2000);
      }

    display() {
        var angle = this.body.angle;
        var pos = this.body.position;
        var index = floor(this.speed % this.animation.length)

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index],0,this.position,this.w,this.h);
        noTint();
        pop();
    }

    animate() {
      this.speed = this.speed+0.0784;
    }
}