class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState:state
    });
  }

  async start(){
    background(bgImg1);
    if(gameState === 0){
      
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    shooter = [shooter1,shooter2];
  }

  story()
  {
    background(bgImg1);
    //storySong.play();
    var nextButton = createButton("NEXT");
    nextButton.position(displayWidth-80,displayHeight - 80);
    nextButton.mousePressed(()=>{
     // console.log("play");
      gameState = 1;
      game.update(1);})
      text("In this world every living being from the tiniest to the most magnificient have aura or in simple terms life forms");
    //text ("In this universe every body from the tiniest of insects to the largest of heavenly bodies contain aura or life energy",);
  }

  play(){
    form.hide();
    Player.getPlayerInfo();
    Bullet.getBulletInfo();
    if(allPlayers !== undefined)
    {
      background("yellow");
      shooter1.visibility = true;
      shooter2.visibility = true;
      var index = 0;
      var x;
      var bullet;
     
      for(var plr in allPlayers)
      {
        index = index + 1;
        x = allPlayers[plr].x;
       
        shooter[index-1].x = x;

        //creating Bullets in database 
        if(player.index == index && keyWentDown("SPACE"))
        {
          bullets.push(new Bullet(shooter[index-1].x,shooter[index-1].y));
          bulletCount +=1;
          gunshotSound.play();
          Bullet.updateCount(bulletCount);
          Bullet.update(shooter[index-1].x,shooter[index-1].y);
        }
      }  
      if(allBullets !== undefined)
      {
        //creating bullets sprites 
        background(bgImg);
        //var bulletIndex = 0;
        var bulletX;
        var bulletY;
        for(var blt in allBullets)
        {
          //index = index + 1;
          //if(allBullets[blt].y<=player.range)
          {
            //allBullets[blt].y = allBullets[blt].y+20;
            bulletX = allBullets[blt].x;
            bulletY = allBullets[blt].y;
            //background("yellow");
            fill("blue");
            bullet = createSprite(bulletX,bulletY,10,10);
            bullet.addImage(bulletImg);
            bullet.scale = 0.0005;
            //bullet.velocityY = 10;
            bulletGroup.add(bullet);
            
          }           
        } 
      }  
    }
    if(frameCount % 60 == 0)
    {
      if(player.index==1)
      {
        targetSprite = createSprite(20,player.range+50,10,10);
        targetSprite.scale=0.03;
        //ADDING IMAGE TO THE TARGETS
        switch(Math.round(random(1,4)))
        {
          case 1:targetSprite.addImage(alien1);
          
          break;

          case 2:targetSprite.addImage(alien2);
          break;

          case 3:targetSprite.addImage(alien3);
          break;

          case 4:targetSprite.addImage(alien4);
          break;
        }
        
        obstacle     = createSprite(random(50,windowWidth-50),windowHeight-100,10,10);
        obstacle.addImage(fireball);
        obstacle.rotationSpeed = 20; 
        obstacle.scale = 0.5; 
        obstacle.velocityY = - 10;
        obstacleGroup.add(obstacle);

        switch(Math.round(random(1,2)))
        {
          case 1:targetSprite.x = 0;
          targetSprite.velocityX=15;
          break;
         
          case 2:targetSprite.x = width
          targetSprite.velocityX=-15;
          break;
        }
        targetSprite.lifetime = displayWidth/15;
        targetGroup1.add(targetSprite);
      }
      if(player.index==2)
      {
        console.log("player2");
        console.log(player.range);
        targetSprite = createSprite(20,displayHeight-50-player.range,10,10);
        targetSprite.scale=0.03;
        //ADDING IMAGE TO THE TARGETS
        switch(Math.round(random(1,4)))
        {
          case 1:targetSprite.addImage(alien1);
          
          break;

          case 2:targetSprite.addImage(alien2);
          break;

          case 3:targetSprite.addImage(alien3);
          break;

          case 4:targetSprite.addImage(alien4);
          break;
        }
        obstacle     = createSprite(random(50,windowWidth-50),100,10,10);
        obstacle.velocityY =  10;
        obstacleGroup.add(obstacle);
        switch(Math.round(random(1,2)))
        {
          case 1:targetSprite.x = 0;
          targetSprite.velocityX=15;
          break;
         
          case 2:targetSprite.x = displayWidth;
          targetSprite.velocityX=-15;
          break;
        }
        targetSprite.lifetime = displayWidth/15;
        targetGroup2.add(targetSprite);
      }
    }
    if(bulletGroup.isTouching(targetGroup1))
    {
      bulletGroup.destroyEach();
      var bulletRef = database.ref("bullets");
      bulletRef.remove(); 
      targetHitSound.play();
      targetGroup1.destroyEach();
      player.score = player.score + 10;
      player.range = player.range + 50;
      Bullet.updateCount(0);
      player.update();
    }
    if(bulletGroup.isTouching(targetGroup2))
    {
      bulletGroup.destroyEach();
      var bulletRef = database.ref("bullets");
      bulletRef.remove(); 
      targetHitSound.play();
      targetGroup2.destroyEach();
      player.score = player.score + 10;
      player.range = player.range + 50;
      Bullet.updateCount(0);
      player.update();

    }
    if(bulletGroup.isTouching(shooter1))
    {
      bulletGroup.destroyEach();
      if(player.index==1)
      {
        player.lives = player.lives - 3;
      }
    }
    if(bulletGroup.isTouching(shooter2))
    { 
      bulletGroup.destroyEach();
    }
    if(obstacleGroup.isTouching(shooter1))
    {
      obstacleGroup.destroyEach();
      player.lives = player.lives - 1;

    }
    if(obstacleGroup.isTouching(shooter2))
    {
      obstacleGroup.destroyEach();
      player.lives = player.lives - 1;

    }
    if(keyIsDown(RIGHT_ARROW))
    {
      player.x += 20;
    }
    if(keyIsDown(LEFT_ARROW))
    {
      player.x -= 20;
    }    
    textSize(35);  
    image(heartImage,width-50,50);
    player.update();
    fill(rgb(255,random(0,255),0));
    if(player.index==2)
    {
      if(displayHeight-50 - player.range <= 50)
      {
        player.range = displayHeight-100;
      }
      else
      {
        player.range = player.range;
      }
    } 
    if(player.index==1)
    {
      if(50+player.range >= displayHeight-50)
      {
        player.range = displayHeight-100;
      }
      else
      {
        player.range = player.range;
      }
    }
    
    fill(245);
    rect(0,0,width,150);
    rect(0,height-100,width,100);
    drawSprites();

    text("LIVES="+player.lives+"    x",width-270,70);
  }
  end()
  {
    
    console.log("end");
    if(player.lives==0)
    {
   
      background(gameOverImg);
    }
    else
    {
      background(victoryImg);
    }
  }

}