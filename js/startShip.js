(function(){

    window.addEventListener('load',init,false);

/*--------------------------------------declaracion de variables--------------------------------*/

    var keySpace       = 32,
        keyLeft        = 37,
        keyUP          = 38,
        keyRigth       = 39,
        keyDown        = 40;

    var canvas          = document.getElementById('canvas'),
        ctx;
    var lastPress;
    var pressing        = [];
    var player          = newArea(90,280,120,120);
    var shots           = [];
    var gameover        = true;
    var score           = 0;
    var enemies         = [];

    var spritesheet     = new Image();
    spritesheet.src     = "/img/Stage2/playerShip.png";

    var spritesheet2     = new Image();
    spritesheet2.src     = "/img/Stage2/meteor.png";

    var spritesheet3     = new Image();
    spritesheet3.src     = "/img/Stage2/shot.png";

    var snd              = new Audio("../sounds/shot.wav");
    var snd2             = new Audio("../sounds/explosion.mp3");

    function newArea(x, y, width, heigth){
        var result = new Rectangle(x,y,width,heigth);
        return result;
    }


    function random(max){
        return ~~(Math.random()*max);
    }

    /*function slope (){
        return Math.random()*10-5;
    }*/

    function init(){                                                //Ejecuta el juego y sus funciones principales
        ctx=canvas.getContext('2d');
        
        run();
        repaint();
    }

    function run(){                                                //recarga el juego cada 50 milisg
        setTimeout(run,50);
        act();
    }

    function repaint(){                                                //Pinta el juego a cada cambio
        requestAnimationFrame(repaint);
        paint(ctx);
    }

    function reset(){

        score=0;
        player.x=500;
        player.y=380;
        shots.length=0;
        enemies.length=0;
        enemies.push(newArea(30,0,60,60));
        enemies.push(newArea(600,0,60,60));
        gameover=false;

    }

    function act(){                                                //Funcionalidad
            // Move Rect
        if(gameover){
            reset();
        }else{    
            if(pressing[keyUP])
                player.y-=20;
            if(pressing[keyRigth])
                player.x+=20;
            if(pressing[keyDown])
                player.y+=20;
            if(pressing[keyLeft])
                player.x-=20;

            // Out Screen
            if(player.x>canvas.width-player.width)
                player.x=canvas.width-player.width;
            if(player.x<0)
                player.x=0;
            
            // New Shot
                if(lastPress==keySpace){
                    shots.push(newArea(player.x+15,player.y,28,40));
                    shots.push(newArea(player.x+95,player.y,28,40));
                    lastPress=null;
                    snd.load();
                    snd.play();
                }
            
            // Move Shots
            for(var i=0,l=shots.length;i<l;i++){
                shots[i].y-=30;
                if(shots[i].y<0){
                    shots.splice(i--,1);
                    l--;
                }
            }

            // Move Enemies
            for(var i=0,l=enemies.length;i<l;i++){
            // Shot Intersects Enemy
                for(var j=0,ll=shots.length;j<ll;j++){
                    if(shots[j].intersects(enemies[i])){
                        score++;
                        enemies[i].x=random(canvas.width/10)*10;
                        enemies[i].y=0;
                        enemies.push(newArea(random(canvas.width/10)*10,0,60,60));
                        shots.splice(j--,1);
                        ll--;
                    }
                }
                
                enemies[i].y+= 10;
                //enemies[i].x+= slope();
                if(enemies[i].y>canvas.height){
                    enemies[i].x=random(canvas.width/10)*10;
                    enemies[i].y=0;
                }
                
                // Player Intersects Enemy
                if(player.intersects(enemies[i])){
                    gameover=true;

                    snd2.load();
                    snd2.play();
                }
                
                // Shot Intersects Enemy
                for(var j=0,ll=shots.length;j<ll;j++){
                    if(shots[j].intersects(enemies[i])){
                        score++;
                        enemies[i].x=random(canvas.width/10)*10;
                        enemies[i].y=0;
                        enemies.push(newArea(random(canvas.width/10)*10,0,60,60));
                        shots.splice(j--,1);
                        ll--;
                        snd2.load();
                        snd2.play();
                    }
                }
            }

        }

    }

    /*-------------------------------Pinta sobre Canvas los elementos--------------------------------*/

    function paint(ctx){

        ctx.fillStyle='#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        
        ctx.fillStyle='#0f0';                                           //Dibuja la nave del jugador
        player.drawImageArea(ctx,spritesheet, 0, 0, 120, 125, 200, 200, 120, 125);

        ctx.fillStyle='#00f';
        for(var i=0,l=enemies.length;i<l;i++){
            enemies[i].drawImageArea(ctx,spritesheet2, 0, 0, 60, 65, 200, 200, 40, 40);
        }
        ctx.fillStyle='#f00';
        for(var i=0,l=shots.length;i<l;i++)
            shots[i].drawImageArea(ctx,spritesheet3, 0, 0, 30, 40, 200, 200, 30, 40);
        
        ctx.fillStyle='#fff';

        if(gameover)
            ctx.fillText('GAME OVER',100,150);
    }

    document.addEventListener('keydown',function(evt){
        lastPress=evt.keyCode;
        pressing[evt.keyCode]=true;
    },false);

    document.addEventListener('keyup',function(evt){
        pressing[evt.keyCode]=false;
    },false);

    function Rectangle(x,y,width,height){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.width=(width==null)?0:width;
        this.height=(height==null)?this.width:height;
    }

    Rectangle.prototype.intersects=function(rect){
        if(rect!=null){
            return(this.x<rect.x+rect.width&&
                this.x+this.width>rect.x&&
                this.y<rect.y+rect.height&&
                this.y+this.height>rect.y);
        }
    }
    
    Rectangle.prototype.fill=function(ctx){
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }

    Rectangle.prototype.drawImageArea=function(ctx,img,sx,sy,sw,sh){
        if(img.width)
            ctx.drawImage(img,sx,sy,sw,sh,this.x,this.y,this.width,this.height);
        else
            ctx.strokeRect(this.x,this.y,this.width,this.height);
    }

})();