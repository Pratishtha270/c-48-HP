var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bgImg,bg;
var softDrink;
var burger;
var pizza;
var juice;
var apple;
var mother,motherAni;
var junkFood;
var healthyFood;
var score;
var hFood;
var jFood;
var ground;
var gameOver,gameOverImg;
var restart,restartImg;
var eatingSound;
var gameOverSound;
score=0;

//load the pictures
function preload(){
bgImg=loadImage("background.jpg");
softDrink=loadImage("soft.drink.jpg");
burger=loadImage("burger.jpg");
pizza=loadImage("pizza.jpg");
juice=loadImage("juice.jpg");
apple=loadImage("apple.jpg");
motherAni=loadAnimation("mom2.png","mom1.png");
gameOverImg=loadImage("gameOver.jpg");
restartImg=loadImage("restart.jpg");
eatingSound=loadSound("eatSound.mp3");
gameOverSound=loadSound("gameOverSound.mp3");
}


function setup() {
  createCanvas(700,400);
  bg=createSprite(400,200);
  bg.addImage(bgImg);
  bg.scale=2.5;
  bg.velocityX = -4;

  mother = createSprite(40,300);
  mother.addAnimation("running", motherAni);
  mother.scale = 0.3;
  console.log("hello");

  ground = createSprite(350,370,700,10);
  ground.visible = false;

  gameOver = createSprite(350,180);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(350,350);
  restart.addImage(restartImg);
  
  gameOver.scale = 1;
  restart.scale = 0.7;

  gameOver.visible = false;
  restart.visible = false;

  hFood=new Group();
  jFood=new Group();
   
}

function draw() {
  background("black"); 
  
  if (gameState===PLAY){
        if(bg.x<0){
         bg.x=width/2;
        }

        if (keyDown("space")){
         mother.velocityY=-10
          }
          mother.velocityY= mother.velocityY+0.8;

          mother.collide(ground);

          spawnJunkFood();
          spawnHealthyFood();

          if(hFood.isTouching(mother)){
                eatingSound.play();
                score+=5
                hFood.destroyEach();
        }

        if(jFood.isTouching(mother)){
              eatingSound.play();
              score-=1
              jFood.destroyEach();
        }

        if(score>=30){
                gameState=END;
                gameOverSound.play();
                console.log("gameover");
        }
        
 }
 else if (gameState === END) {
        ground.velocityX = 0;
        console.log("ground")
        mother.velocityY = 0;
        mother.visible=false;

        gameOver.visible = true;
        restart.visible = true;
        
        //set velcity of each game object to 0
        hFood.setVelocityXEach(0);
        hFood.setVelocityYEach(0);
        jFood.setVelocityXEach(0);
        jFood.setVelocityYEach(0);

        hFood.destroyEach();
        jFood.destroyEach();
        
        //set lifetime of the game objects so that they are never destroyed
        hFood.setLifetimeEach(-1);
        jFood.setLifetimeEach(-1);
        
        if(mousePressedOver(restart)) {
          reset();
        }
      }
  
  drawSprites();

  fill("black");
  textSize(30);
text("Score: "+score,550,50);
}
 


function spawnJunkFood() {
  if(frameCount % 120 === 0) {
          var y=random(20,300);
    junkFood = createSprite(700,y,10,40);
    junkFood.velocityX = -10;

    junkFood.scale=0.2;
    
    //generate random obstacles
    var rand1 = Math.round(random(1,3));
    switch(rand1) {
      case 1: junkFood.addImage(pizza);
              break;
      case 2: junkFood.addImage(burger);
              break;
      case 3: junkFood.addImage(softDrink);
              break;
      default: break;
    }
    jFood.add(junkFood);

  mother.depth=junkFood.depth+1;
  }}

  function spawnHealthyFood() {
        if(frameCount % 200 === 0) {
                var hy=random(30,200);
          healthyFood = createSprite(600,hy,10,40);
          healthyFood.velocityX = -9;
      
          healthyFood.scale=0.2;
          
          //generate random obstacles
          var rand2 = Math.round(random(1,2));
          switch(rand2) {
            case 1: healthyFood.addImage(juice);
                    break;
            case 2: healthyFood.addImage(apple);
                    break;
            default: break;
          }
          hFood.add(healthyFood);

          mother.depth=healthyFood.depth+1;
        }}

        function reset(){
                gameState = PLAY;
                gameOver.visible = false;
                restart.visible = false;
                mother.visible=true;
                
                hFood.destroyEach();
                jFood.destroyEach();
                
                mother.changeAnimation("running",motherAni);
                score = 0;
                
              }