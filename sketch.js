var score =0;
var rocket,ufo,asteroid, satellite, missile, earth, space, fireball, start;
var gif

var rocketImg, missileImg, satelliteImg, asteroidImg, blastImg, earthImg, fireballImg, startImg;

var ufoGroup, ufoGroup, missileGroup, satelliteGroup, fireballGroup;


var life =3;
var score=0;
var gameState=0

function preload(){
  rocketImg = loadImage("rocket.png")
  blastImg = loadImage("blast.png")
  missileImg = loadImage("missile.png")
  ufoImg = loadImage("ufo.png")
  space_bg= loadImage("space.gif")
  asteroidImg = loadImage("asteroid.png")
  satelliteImg = loadImage("satellite.png")
  startImg = loadImage("start.png")

  earthImg = loadAnimation("e1.png","e2.png","e3.png","e4.png","e5.png","e6.png","e9.png","e10.png","e11.png","e12.png","e13.png","e14.png","e15.png","e16.png")
  fireballImg = loadAnimation("f1.png","f2.png","f3.png","f4.png")

  missile_shot = loadSound("shoot_sound.mp3")
  bg_song = loadSound("space_music.mp3")
  sad = loadSound("sad_sound.mp3")
  boom = loadSound("boom.mp3")
  fireball_sound = loadSound("fireball_sound.mp3")

}
function setup() {
  createCanvas(windowWidth,windowHeight);
  start = createSprite(1000,600,20,20)
  start.addImage(startImg)
  start.scale = 5
  // bg_song.play()
  // bg_song.setVolume(0.5)
  space = createImage("space.gif")
  // fill("blue")
  earth= createSprite(-50, width/3.5, 10,height);
  earth.addAnimation("earth",earthImg)
  earth.scale = 5
  // earth.rotate = 4
  // earth.debug = true
  earth.setCollider("rectangle",0,0,100,1200)
  rocket= createSprite(100, height/2, 50,50);
  rocket.addImage(rocketImg)
  rocket.scale=0.8
  // rocket.debug = true
  rocket.setCollider("rectangle",0,0,400,250)


  missileGroup = createGroup();   
  ufoGroup = createGroup();
  asteroidGroup = createGroup()   
  satelliteGroup = createGroup()
  fireballGroup = createGroup()
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background(space_bg);
  //text(mouseX+',' +mouseY,mouseX,mouseY)
  

  if(gameState === 0){
    fill("red")
    textSize(40)
    text("SPACE SHOOTER",200,150)
    text("Some UFOs, asteroids and satellites are coming towards Earth.",200,200)
    text("Your job is to protect Earth by shooting lasers at them.", 200,250)
    text("Dodge the fireballs, or you will lose instantly.",200,300)
    text("Controls:",200,400)
    text("Shoot-Space",200,450)
    text("Move-Move your cursor up and down",200,500)
    textSize(50)
    text("Click to start the game",windowWidth/2-300,650)

  }

  if(mousePressedOver(start) && gameState === 0){
    gameState = 1
  }



  if(gameState===1){
    rocket.y=mouseY  
    start.visible = false

    heading.html("Life: "+life)
    heading.style('color:red'); 
    heading.position(150,20)

    fill("yellow")
    textSize(50)
    textFont("Courier New, monospace")
    text("Space Shooter",1000,100)

    scoreboard.html("Score: "+score)
    scoreboard.style('color:red'); 
    scoreboard.position(width-200,20)

    if (frameCount % 100 === 0) {
      drawufo();
    }

    if(frameCount % 150 === 0){
      drawasteroid()
    }

    if(frameCount % 200 === 0){
      drawsatellite()
    }

    if (ufoGroup.collide(earth)){
      life = life-1
      ufoGroup.destroyEach()
    }
    if(ufoGroup.collide(missileGroup)){
      handleUfoCollision();
    }

    if(fireballGroup.collide(rocket)){
      handleGameover()
    }

    if (asteroidGroup.collide(earth)){
      life = life-1
      asteroidGroup.destroyEach()
    }
    if(asteroidGroup.collide(missileGroup)){
      handleAsteroidCollision(asteroidGroup);
    }

    if (satelliteGroup.collide(earth)){
      life = life-1
      satelliteGroup.destroyEach()
    }
    if(satelliteGroup.collide(missileGroup)){
      handleSatelliteCollision(satelliteGroup);
    }
    if(life === 0){
      handleGameover()
    }

    drawSprites();
  }
}

function drawufo(){
  ufo = createSprite(2020,random(20,1180),40,40);
  ufo.addImage(ufoImg);
  ufo.scale = 0.9;
  ufo.velocityX = -10;
  ufo.lifetime = 400;
  ufoGroup.add(ufo);
  fireball = createSprite(ufo.x,ufo.y,20,20)
  fireball.addAnimation("fireball",fireballImg)
  fireball.scale=0.3 
  fireball.velocityX= -15
  fireball.lifetime = 500
  fireball_sound.play()
  fireball_sound.setVolume(0.1)
  fireballGroup.add(fireball)
}

function drawasteroid(){
  asteroid = createSprite(2020,random(20,1180),40,40)
  asteroid.addImage(asteroidImg)
  asteroid.scale = 1.5
  asteroid.velocityX = -15
  asteroid.lifetime = 400
  asteroidGroup.add(asteroid)
}

function drawsatellite(){
  satellite = createSprite(2020,random(20,1180),40,40)
  satellite.addImage(satelliteImg)
  satellite.scale = 0.5
  satellite.velocityX = -12.5
  satellite.lifetime = 400
  satelliteGroup.add(satellite)
}

function keyReleased(){
  if(keyCode === 32){
    shootmissile()
  }
}

function shootmissile(){
  missile= createSprite(150, width/2, 50,20)
  missile.y= rocket.y-20
  missile.addImage(missileImg)
  missile.scale=0.3
  missile.velocityX= 9
  missile_shot.play()
  missile_shot.setVolume(0.1)
  missileGroup.add(missile)
}

function handleUfoCollision(){
    if (life > 0) {
       score=score+1;
    }

    blast= createSprite(missile.x+60, missile.y, 50,50);
    blast.addImage(blastImg)
    boom.play() 

    
    blast.scale=0.4
    blast.life=20
    missileGroup.destroyEach()
    ufoGroup.destroyEach()
}

function handleAsteroidCollision(){
  if (life > 0) {
     score=score+1;
  }

  blast= createSprite(missile.x+60, missile.y, 50,50);
  blast.addImage(blastImg) 
  boom.play()

  
  blast.scale=0.4
  blast.life=20
  missileGroup.destroyEach()
  asteroidGroup.destroyEach()
}

function handleSatelliteCollision(){
  if (life > 0) {
     score=score+1;
  }

  blast= createSprite(missile.x+60, missile.y, 50,50);
  blast.addImage(blastImg) 
  boom.play()

  
  blast.scale=0.4
  blast.life=20
  missileGroup.destroyEach()
  satelliteGroup.destroyEach()
}

function handleGameover(enemyGroup){
      gameState=2
      sad.play()
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://media.istockphoto.com/id/977397058/vector/destroyed-earth.jpg?s=170667a&w=0&k=20&c=KC0x48g3nsOfgl_7S-IvUv44vTasWZPALHrgGtfL0_w=",
        imageSize: "130x130",
        confirmButtonText: "Thanks For Playing"
      });
  }
