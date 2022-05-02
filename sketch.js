var database,positionX,backGroundImg,gameState=0,playerCount,player,shooter1,shooter2,
allPlayers,game,form,shooter,bullets = [],bulletCount=0,allBullets,targetSprite,obstacle,obstacleGroup,lives=3,hearts,
targetGroup1, targetGroup2 ,alienImg,bulletGroup,score,banner;

//all the images
var heartImage,bgImg1,bulletImg,shooter1Img,shooter2Img,alien1,alien2,alien3,alien4,fireball,gunShot,gameOverImg,victoryImg,bannerImg,bgImg;

//all the sounds
var gunshotSound, fireballSound , targetHitSound, gameOverSound;

function preload()
{   
    //IMAGES
    heartImage  = loadImage("—Pngtree—red 3d heart 2_5869841.png");
    bgImg1      = loadImage("game opening page.jpg");
    bulletImg   = loadImage("bulletsImg.png");
    shooter1Img = loadImage("shooter1.png");
    shooter2Img = loadImage("shooter2.png");
    alien1      = loadImage("alien1.png");
    alien2      = loadImage("alien2.png");
    alien3      = loadImage("alien3.png");
    alien4      = loadImage("alien4.png");
    fireball    = loadImage("fireball.png");
    gameOverImg = loadImage("gameOverImg.jpg");
    bannerImg   = loadImage("—Pngtree—lower third video banner icons_6242260.png");
    victoryImg  = loadImage("victoryImg.jpg");
    bgImg       = loadImage("red-space-03.jpg");
    //SOUNDS
    gunshotSound   = loadSound("mixkit-game-gun-shot-1662.mp3");
    fireballSound  = loadSound("mixkit-fire-explosion-1343.wav");
    targetHitSound = loadSound("mixkit-shot-light-explosion-1682.wav");
    gameOverSound  = loadSound("mixkit-fire-explosion-1343.wav");
}   

function setup()
{
    createCanvas(displayWidth-20,displayHeight-20);

    shooter1 = createSprite(displayWidth/2,50,50,10);  
    shooter1.debug = true;
    shooter1.setCollider("circle",0,0,40);
    shooter1.addImage(shooter1Img);
    shooter1.scale = 0.5;   
    shooter1.visibility = false;

    shooter2 = createSprite(displayWidth/2,displayHeight-50,50,10);
    shooter2.addImage(shooter2Img);
    shooter2.setCollider("circle",0,0,40);
    shooter2.debug= true;
    shooter2.scale = 0.5;
    shooter2.visibility = false;

    database = firebase.database();
    score=0;
    game = new Game();
    game.getState();
    Bullet.getCount();
    game.start();
   
    targetGroup1 = new Group();
    targetGroup2 = new Group();
    bulletGroup  = new Group();
    obstacleGroup= new Group();

    banner = createSprite(width-200,50);
    banner.addImage(bannerImg);
    banner.scale = 0.3;
}

function draw()
{
    background("yellow");
    player.getScore();
    //console.log(score1);
    //console.log(score2);
    console.log("gamestate="+gameState);
    if(playerCount==2 && gameState==0)
        {
            game.update(0.5);
        }
    if(gameState==0.5)
    {
        game.story();
    }
    if(gameState==1)
    {
        clear();
        game.play();
        
    }
    if(player.lives==0)
    {
      
        game.update(2)
        gameOverSound.play();
    }
    if(gameState==2)
    {
        game.end();
    }
    if(score%50==0)
    {
        textSize(40);
        fill("blue");
        text("LEVEL"+score/50,displayWidth/2 -50 , displayHeight/2 - 50);
    }
    fill("white");
    text("SCORE="+score,displayWidth/2-50,displayHeight/2);
    text("x="+mouseX+",y="+mouseY,mouseX,mouseY);
}





