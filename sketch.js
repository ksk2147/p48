var thief, thiefImage, thiefcaught;
var bg, bgImg
var obstacle, obstaclesGroup;
var obstacle1Img, obstacle2Img;
var gameState = "menu";
var police, policeImage;
var policeman, policemanImg;
var gameOver, gameOverImg;
var fireball, fireballImg, fireballsGroup;
var score = 0;
var logo;
var bombSound;


function preload(){
  thiefImage = loadAnimation("images/thief1.png", "images/thief2.png", "images/thief3.png", "images/thief4.png")
  bgImg = loadImage("images/bgLong.png");
  obstacle1Img = loadImage("images/obstacle1.png");
  obstacle2Img = loadImage("images/obstacle2.png");
  policeImage = loadImage("images/police.png");
  thiefcaught = loadImage("images/thief2.png");
  policemanImg = loadImage("images/policeman.png");
  gameOverImg = loadImage("images/gameOver.png");
  fireballImg = loadImage("images/fireball.png");
  logo = loadImage("images/logo.gif");
  bombSound = loadSound("images/Bomb.mp3")

  obstaclesGroup = new Group();
  fireballsGroup = new Group();
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = createSprite(width/2, height);
  bg.addImage(bgImg);
  bg.scale = 2;
  bg.velocityX = -5

  thief = createSprite(width/2, height/1.3, 50, 50);
  thief.addAnimation("running", thiefImage);
  thief.scale = 0.7;
  //thief.debug = true;

  police = createSprite(width/8, height/1.3, 50, 50);
  police.addImage(policeImage);

  policeman = createSprite(width/2.4, height/1.1, 50, 50)
  policeman.addImage(policemanImg);
  policeman.scale = 2;
  policeman.visible = false;
}

function draw() {
  if (bg.x<0){
   bg.x = 600;
  }

  if(gameState === "menu"){
    background ("Blue");
    
    textSize(50);
    fill("white");
    text("PRESS ENTER TO START THE GAME", width/5, height/3);
    image(logo,width/2.5, height/20);

    textSize(40);
    fill("Red");
    text("RULES:", width/4.5, height/1.5);

    textSize(30);
    fill("Yellow");
    text("1. Press space to shoot fireballs at obstacles ahead and obtain a score", width/3, height/1.5);

    textSize(30);
    fill("Yellow");
    text("2. The game ends if your thief hits an ostacle.", width/3, height/1.4);

    if(keyDown("Enter")){
      gameState = "play";
    }
  }

  if(gameState === "play"){

    if(keyDown("space")){
      throwFireballs();
    }
    if(obstaclesGroup.isTouching(fireball)){
      console.log("Fireball has hit obstacle");
      obstaclesGroup.destroyEach();
      fireballsGroup.destroyEach();
      score += 10;
      bombSound.play;
    }
    if(obstaclesGroup.isTouching (thief)){
      console.log("Thief has hit obstacle");
      gameState = "end";
      
    }
  

  if(gameState === "end"){
    policeman.visible = true;
    gameOver = createSprite(width/2, height/4);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.8
  };
  spawnObstacles();
  drawSprites();

  textSize(30);
  fill("white");
  text("Score: "+score, 100, 100);
  
}
}

function spawnObstacles(){
  if(frameCount % 100 === 0){
    obstacle = createSprite(width, height-120)
    obstacle.velocityX = -3;
    //obstacle.debug = true;
    var rand = Math.round(random(1, 2));
    if (rand === 1){
      obstacle.addImage(obstacle1Img);
    }
    if (rand === 2){
      obstacle.addImage(obstacle2Img);
      obstacle.scale = 0.3;
    }
    obstaclesGroup.add(obstacle);
  }
}

function throwFireballs(){
  fireball = createSprite(thief.x, thief.y+50)
  thief.depth = fireball.depth+1;
  fireball.velocityX = 4
  fireball.addImage(fireballImg);
  fireball.scale = 0.1;
  fireball.lifetime = 600;
  //fireball.debug = true;
  fireball.setCollider("circle", 0, 0, 30);
  fireballsGroup.add(fireball);
}