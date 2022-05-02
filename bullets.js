class Bullet
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
    static update(X,Y)
    {
        var bulletIndex = "bullets/bullet" + bulletCount; 
        if(player.index==1)
        {
            Y= Y + player.range;
        }
        if(player.index==2)
        {
            Y= Y - player.range;
        }
        database.ref(bulletIndex).set({
            x : X,
            y : Y
        });
        
    }
    static getCount()
    {
        var bulletCountRef = database.ref('bulletCount');
        bulletCountRef.on("value",function(data){
            bulletCount = data.val();
        })
    }
    static updateCount(count)
    {
       database.ref('/').update({
           bulletCount : count
       });
      
    }
    static getBulletInfo()
    {
        var bulletInfoRef = database.ref('bullets');
        bulletInfoRef.on("value",(data)=>{
            allBullets = data.val();
        })
    }

  
}