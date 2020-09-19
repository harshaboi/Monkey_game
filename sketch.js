var play;
var end;
var ground;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var survive = 0;
var gameState = 0;
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400); 
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  monkey = createSprite(135,300,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground=createSprite(300,300,600,12.5)

}


function draw() {
background("white");
  

  fill("black");
       monkey.velocityY = monkey.velocityY + 3 
  text("Survival time: "+ survive,150,100);
  text("Score: "+score,165 ,125);
  if(gameState == 0){
    bananas()
    obstacles()
    survive = Math.round(frameCount/30);

    if(keyDown("space")&& monkey.y >=259) {
        monkey.velocityY = -26;
    }
    

  
    if(foodGroup.collide(monkey)){
      score = score + 1;
      foodGroup.destroyEach();
  }
    if(obstacleGroup.collide(monkey)){

      gameState = 1;
  }
} else if(gameState == 1){
      survive = survive;
      score = score;
      foodGroup.destroyEach();
      obstacleGroup.destroyEach();
}
  monkey.collide(ground);

    ground.velocityX = -3;
      if(ground.x <=ground.width/3 ){
       ground.x = 300;
  }
  
     
  drawSprites();
}
function bananas(){
  if(frameCount % 80 === 0){
    banana = createSprite(400,Math.round(random(120,200)),20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 80;
    foodGroup.add(banana);
  }  
  
  
}
function obstacles(){
  if(frameCount % 125 === 0){
    obstacle = createSprite(400,275,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.11;
    obstacle.velocityX = Math.round(random(-9,-6));
    obstacle.lifetime = Math.round(400/6);
    obstacleGroup.add(obstacle);
    obstacle.setCollider("circle",50,0,0);
  }
}




