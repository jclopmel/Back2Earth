(function(){

    window.addEventListener('load',startGame,false);

/*--------------------------------------declaracion de variables--------------------------------*/

    var keySpace       = 32,
        keyLeft        = 37,
        keyUP          = 38,
        keyRigth       = 39,
        keyDown        = 40,
        speed          = 20;

    var canvas          = document.getElementById('canvas'),
        ctx,
        lastPress;
    var pressing        = [];
    var player          = newArea(90,280,120,120);
    var earth           = newArea(0,0,200,200);
    var shots           = [];
    var gameover        = true;
    var score           = 0;
    var topScore        = 30;
    var asteroids       = [];
    var timeout         = 4000;

    var spritesheet     = new Image();
    spritesheet.src     = "/img/Stage2/playerShip.png";

    var spritesheet2     = new Image();
    spritesheet2.src     = "/img/Stage2/meteor.png";

    var spritesheet3     = new Image();
    spritesheet3.src     = "/img/Stage2/shot.png";

    var spritesheet4     = new Image();
    spritesheet4.src     = "/img/Stage2/earthSmall.png";

    var spritesheet5     = new Image();
    spritesheet5.src     = "/img/Stage2/keys.png";
    var keys             = newArea(800,50,250,59);

    var snd              = new Audio("../sounds/shot.wav");
    var snd2             = new Audio("../sounds/explosion.mp3");

    var bg               = new Image();
    bg.src               = "/img/Stage2/backgound1.jpg";
    var bgMove           = 0;


    function bgMoving (){
        bgMove+=3;
        if (bgMove>0){
            bgMove -= 700;
        }
    }

    function newArea(x, y, width, heigth){
        var result = new Rectangle(x,y,width,heigth);
        return result;
    }

    function random(max){
        return ~~(Math.random()*max);
    }

    function startGame(){                                                //Ejecuta el juego y sus funciones principales
        ctx=canvas.getContext('2d');
        
        refreshTime();
        repaint();
    }

    function refreshTime(){                                                //recarga el juego cada 50 ms
        setTimeout(refreshTime,50);
        movePlay();
    }

    function repaint(){                                                     //Pinta el juego a cada cambio
        requestAnimationFrame(repaint);
        paint(ctx);
    }

    function reset(){

        score=0;
        player.x=500;
        player.y=380;
        shots.length=0;
        asteroids.length=0;
        setTimeout(function (){
            asteroids.push(newArea(30,0,60,60));
            asteroids.push(newArea(600,0,60,60));
        }, timeout);
        gameover=false;

    }

    function keyPush (){
        if(pressing[keyUP]){
            player.y-=speed;
                }
        if(pressing[keyRigth]){
            player.x+=speed;
        }
        if(pressing[keyDown]){
            player.y+=speed;
        }
        if(pressing[keyLeft]){
            player.x-=speed;
        }

    }

    function shotMove(){
        for(var i=0,l=shots.length;i<l;i++){
                shots[i].y-=30;
                if(shots[i].y<0){
                    shots.splice(i--,1);
                    l--;
                }
            }
    }

    function movePlay(){                                                //Funcionalidad
/*-----------------------------------------Movimiento de la nave-------------------------------------------*/
        if(gameover){
            reset();
        }else{

            keyPush ();  
/*------------------------------------------Limite de pantalla-----------------------------------------------*/
            if(player.x>canvas.width-player.width)
                player.x=canvas.width-player.width;
            if(player.x<0)
                player.x=0;
            
/*-------------------------------------Acción de disparo doble y movimiento---------------------------------------*/
                if(lastPress==keySpace){
                    shots.push(newArea(player.x+15,player.y,28,40));
                    shots.push(newArea(player.x+95,player.y,28,40));
                    lastPress=null;
                    snd.load();
                    snd.play();
                }
            
            // Move Shots
            
            shotMove();

/*-------------------------------------Movimiento de arteroides e interaccion---------------------------------------*/
         setTimeout(function(){
            for(var i=0,l=asteroids.length;i<l;i++){
            // Disparo-asteroide
                for(var j=0,ll=shots.length;j<ll;j++){
                    if(shots[j].intersects(asteroids[i])){
                        score++;
                        asteroids[i].x=random(canvas.width/10)*10;
                        asteroids[i].y=0;
                        asteroids.push(newArea(random(canvas.width/10)*10,0,60,60));
                        shots.splice(j--,1);
                        ll--;
                    }
                }
                
                asteroids[i].y+= 10;
                if(asteroids[i].y>canvas.height){
                    asteroids[i].x=random(canvas.width/10)*10;
                    asteroids[i].y=0;
                }
                
                // Lose condition
                if(player.intersects(asteroids[i])){
                    gameover=true;

                    snd2.load();
                    snd2.play();
                
                }
                if(score>=topScore){                        //Condiciona fin: Earth
                    earth.x = 700;
                    earth.y +=0.25; 
                    if(earth.y>=200){
                            earth.y=200;
                        }
                    if(earth.intersects(player)){

                        timer();
                        setTimeout(function nextStage(){
                            location.href="animation2.html";
                        },1500);                        
                    }  

                }
            }
        }, timeout);

        }

        bgMoving();

    }

    /*-------------------------------Pinta sobre Canvas los elementos--------------------------------*/

    function paint(ctx){

        ctx.drawImage(bg, 0, bgMove);                                           //Dibuja el fondo priero y luego movido
        ctx.drawImage(bg, 0, 700+bgMove);
                                                        
        ctx.font="20px Georgia white";
        ctx.fillText("Score: "+score,30,30);                                     //Score
                                                                             
        player.drawImageArea(ctx,spritesheet, 0, 0, 120, 125, 200, 200, 120, 125);  //Dibuja la nave del jugador

        if(score<1){
            keys.drawImageArea(ctx,spritesheet5, 0, 0, 250, 59, 200, 200, 250, 59);
        }

                                                  
        if(score>=topScore){                                                    //Dibuja la tierra
            earth.drawImageArea(ctx,spritesheet4, 0, 0, 200, 200, 200, 200, 200, 200);
        }   

        
        for(var i=0,l=asteroids.length;i<l;i++){                            //Dibuja asteroides
            asteroids[i].drawImageArea(ctx,spritesheet2, 0, 0, 60, 65, 200, 200, 40, 40);
        }
        
        for(var i=0,l=shots.length;i<l;i++)                                //Dibuja shots
            shots[i].drawImageArea(ctx,spritesheet3, 0, 0, 30, 40, 200, 200, 30, 40);
        
        ctx.fillStyle='#fff';
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

    function timer(){                                                                       //Datos de acceso a firebase

         var config = {
            apiKey: "AIzaSyAkVbI1lQV57a1Q9RO9mlSz1W9NPZXQQxY",
            authDomain: "back2earth-1234.firebaseapp.com",
            databaseURL: "https://back2earth-1234.firebaseio.com",
            projectId: "back2earth-1234",
            storageBucket: "back2earth-1234.appspot.com",
            messagingSenderId: "858443560107"
          };

        firebase.initializeApp(config);

        $.get("https://back2earth-1234.firebaseio.com/player/.json", function (data){

            firebase.database().ref("player").on("child_added", snapshot => {                  //Localiza objectos dentro de la ID

                console.log(snapshot.val());
                if (snapshot.val().time2==0){
                    var startTime = Date.now();
                    var obj = {
                        time2 : startTime
                    }
                    let update = {};

                    var temp = snapshot.ref.path.ct[1];
                    firebase.database().ref("player").child(temp).update(obj);                  //Actualiza lo indicado (obj) en child temp
                }
            });
       });  
    }

})();