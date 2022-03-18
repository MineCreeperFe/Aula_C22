const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon, ball;
var boatAnimationsMainDatabase, boatAnimationImageDatabase;
var brokenboatAnimationsMainDatabase, brokenboatAnimationImageDatabase;
var watersplashAnimationsMainDatabase, watersplashAnimationImageDatabase;
var score = 0

var ballmatriz = [];
var boatmatriz = [];
var boatanimation = []; 
var brokenboatanimation = [];
var waterSplashAnimation = []

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatAnimationsMainDatabase = loadJSON("./assets/boat/boat.json");
  boatAnimationImageDatabase = loadImage("./assets/boat/boat.png");
  brokenboatAnimationsMainDatabase = loadJSON("./assets/boat/brokenBoat.json");
  brokenboatAnimationImageDatabase = loadImage("./assets/boat/brokenBoat.png");
  watersplashAnimationsMainDatabase = loadJSON("./assets/waterSplash/waterSplash.json");
  watersplashAnimationImageDatabase = loadImage("./assets/waterSplash/waterSplash.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  angleMode(DEGREES);
  angle = 15;

  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);

  var boatAnimationFrames = boatAnimationsMainDatabase.frames;
  for (var i = 0; i < boatAnimationFrames.length; i = i+1) {
    var pos = boatAnimationFrames[i].position;
    var img = boatAnimationImageDatabase.get(pos.x, pos.y, pos.w, pos.h);
    boatanimation.push(img);
  }
  
  var waterSplashAnimationFrames = watersplashAnimationsMainDatabase.frames;
  for (var i = 0; i < waterSplashAnimationFrames.length; i = i+1) {
    var pos = waterSplashAnimationFrames[i].position;
    var img = watersplashAnimationImageDatabase.get(pos.x, pos.y, pos.w, pos.h);
    waterSplashAnimation.push(img);
  }

  var brokenboatAnimationFrames = brokenboatAnimationsMainDatabase.frames;
  for (var i = 0; i < brokenboatAnimationFrames.length; i = i+1) {
    var pos = brokenboatAnimationFrames[i].position;
    var img = brokenboatAnimationImageDatabase.get(pos.x, pos.y, pos.w, pos.h);
    brokenboatanimation.push(img);
  }
}

function draw() {
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width * 2, 1);

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop()
  for (var i = 0; i < ballmatriz.length; i = i+1) {
    showReleasedBalls(ballmatriz[i],i); 
    collisionWithBoat(i);
  }

  cannon.display();
  showBoats()
}

function keyPressed() {
  if (keyCode === 32) {
    ball = new Ball(cannon.x, cannon.y);
    ball.trajectory = [];
    Matter.Body.setAngle(ball.body, cannon.angle);
    ballmatriz.push(ball);
  }
}

function keyReleased() {
  if(keyCode === 32) {
    ballmatriz[ballmatriz.length-1].shoot();
    }
  }

  function collisionWithBoat(index) {
    for (var i = 0; i < boatmatriz.length; i++) {
      if (ballmatriz[index] !== undefined && boatmatriz[i] !== undefined) {
        var collision = Matter.SAT.collides(ballmatriz[index].body, boatmatriz[i].body);
  
        if (collision.collided) {
          boatmatriz[i].remove(i);
  
          Matter.World.remove(world, ballmatriz[index].body);
          delete ballmatriz[index];
        }
      }
    }
  }  

function showReleasedBalls(ball,index) {
  if (ball) {
    ball.display();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      ball.remove(index);
    }
  }
}

function showBoats(){
  if (boatmatriz.length > 0) {
    if (boatmatriz[boatmatriz.length - 1] === undefined || boatmatriz[boatmatriz.length - 1].body.position.x < width - 300) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(width, height - 100, 170, 170, position, boatanimation);

      boatmatriz.push(boat);
    }

    for (var i = 0; i < boatmatriz.length; i++) {
      if (boatmatriz[i]) {
        Matter.Body.setVelocity(boatmatriz[i].body,{x:-0.9, y:0});
        boatmatriz[i].display();
        boatmatriz.animate();
      }
    }

  }else {
        var boat = new Boat(width, height - 60, 170, 170, -60, boatanimation);
        boatmatriz.push(boat);
  }
}
