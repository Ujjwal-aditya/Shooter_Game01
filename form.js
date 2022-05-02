class Form{
    constructor()
    {
         this.input     = createInput("name");
         this.button    = createButton("PLAY");
         this.greetings = createElement('h3');
         this.reset     = createButton("Reset");
    }

    hide()
    {
        this.input.hide();
        this.button.hide();
        this.greetings.hide();
    }

    display()
    {
        var title = createElement('h2');
        title.html("Shooter Game");
        title.position(displayWidth/2-50,0);
        
        this.reset.position(displayWidth-100,50);
        
        this.input.position(displayWidth/2-50,displayHeight/2-80);

        this.button.position(displayWidth/2+30,displayHeight/2);

        this.button.mousePressed(()=>
        {
            this.input.hide();
            this.button.hide();

            player.name = this.input.value();
            playerCount+=1;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);
            this.greetings.html("WELCOME "+player.name);
            this.greetings.position(displayWidth/2-50,displayHeight/2-80);
        })

        this.reset.mousePressed(()=>
        {
           
                clear();
                game.update(0);
                player.updateCount(0);
                game.start();
                Bullet.updateCount(0);
        })
    
    }
}