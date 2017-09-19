(function(){

    window.addEventListener('load',startGame,false);


/*--------------------------------------declaracion de variables--------------------------------*/
    
    var canvas          = document.getElementById('canvas'),
        ctx;

    var spritesheet     = new Image();
    spritesheet.src     = "/img/Anim/ufo.png";
    var ufo             = newArea(200,0,149,99);

    var spritesheet2    = new Image();
    spritesheet2.src    = "/img/Anim/bg2.jpg";
    var bg              = newArea(0,0,1100,600);

    var snd             = new Audio ("../sounds/ufo.mp3");


/*------------------------------Functiones--------------------------------------------*/
    function nextStage(){ 
            location.href="gameOver.html";  
    } 

    function newArea(x, y, width, heigth){
        var result = new Rectangle(x,y,width,heigth);
        return result;
    }

    function startGame(){                                                //Ejecuta el juego y sus funciones principales
        ctx=canvas.getContext('2d');
        
        refreshTime();
        repaint();
        snd.play();
    }

    function refreshTime(){                                                //recarga el juego cada 50 ms
        setTimeout(refreshTime,50);
        movePlay();
    }

    function repaint(){                                                     //Pinta el juego a cada cambio
        requestAnimationFrame(repaint);
        paint(ctx);
    }


    function ufoMove(){

        if(ufo.y<=470){
                ufo.x += 2;
                ufo.y += 5;
            }
        if (ufo.y>=460){
           setTimeout(nextStage(),3000); 
        }
                 

    }

    function movePlay(){
        ufoMove();
    }

    
/*------------------------------Dibujo del canvas--------------------------------------------*/
    function paint(ctx){

        ctx.fillStyle='#000';
        bg.drawImageArea(ctx,spritesheet2, 0, 0, 1100, 600, 120, 120, 1100, 600);

        ctx.fillStyle='#0f0';                                                       //Dibuja el ufo
        ufo.drawImageArea(ctx,spritesheet, 0, 0, 149, 99, 120, 120, 149, 99);   


        ctx.fillStyle='#fff';

    }

    function Rectangle(x,y,width,height){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.width=(width==null)?0:width;
        this.height=(height==null)?this.width:height;
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