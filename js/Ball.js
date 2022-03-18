class Ball {
    constructor(x, y) {
        let options = {
            isStatic:true
        };

        this.r = 30;
        this.body = Bodies.circle(x, y, this.r, options);
        this.ballImage = loadImage("assets/cannonball.png");
        this.trajectory = [];
        this.animation = [this.ballImage];
        this.isSink = false;
        this.speed = 0.05;

        World.add(world, this.body);
    }

    remove(index) {
        this.isSink = true;

        Matter.Body.setVelocity(this.body, { x: 0, y: 0 });

        this.animation = waterSplashAnimation;
        this.speed = 0.05;
        this.r = 150;

        setTimeout(() => {
          Matter.World.remove(world, this.body);
          delete ballmatriz[index];
        }, 1000);
      }

      animate() {
          this.speed = this.speed+0.05
      }

    display() {
        var pos = this.body.position;
        var angle = this.body.angle;
        var index = floor(this.speed%this.animation.lenght)
        push();
        translate(pos.x,pos.y);
        rotate (angle);
        imageMode(CENTER);
        image(this.this.animation[index], 0, 0, this.r, this.r);
        pop();
        if (this.body.velocity.x > 0 && pos.x > 10 && !this.isSink) {
            var position = [pos.x, pos.y];
            this.trajectory.push(position);
        }
        for (var i = 0; i < this.trajectory.length; i = i+1) {
            image(this.ballImage, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
        }
    }
    shoot() {
        var ballangle = cannon.angle-28;
        ballangle = ballangle*(3.14/180);
        var ballvelocity = p5.Vector.fromAngle(ballangle);
        ballvelocity.mult(0.5);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, {x: ballvelocity.x*(180/3.14), y: ballvelocity.y*(180/3.14)});
    }
}