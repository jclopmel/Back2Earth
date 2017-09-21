(function(){

    window.addEventListener('load',startGame,false);

/*--------------------------------------declaracion de variables--------------------------------*/
    
    var canvas          = document.getElementById('canvas'),
        ctx;

    var spritesheet     = new Image();
    spritesheet.src     = "/img/Anim/ufo.png";
    var ufo             = newArea(1000,0,126,84);

    var spritesheet2    = new Image();
    spritesheet2.src    = "/img/Anim/bg.jpg";
    var bg              =newArea(0,0,1100,600);

    var spritesheet3    = new Image();
    spritesheet3.src    = "/img/Anim/ligth.png";
    var ligth           =newArea(365,150,361,400);

    var spritesheet4    = new Image();
    spritesheet4.src    = "/img/Anim/rojo.png";
    var rojo            = newArea(390,460,20,31);

    var snd             = new Audio ("../sounds/ufo.mp3");
    snd.play();

    function nextStage(){ 
        if (ufo.y<=-20){
            location.href="stage1.html";  
        }  
    } 

    function newArea(x, y, width, heigth){
        var result = new Rectangle(x,y,width,heigth);
        return result;
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

    function drawLigth (){
            ctx.fillStyle='#0f0';                                                       //Dibuja la luz
            ligth.drawImageArea(ctx,spritesheet3, 0, 0, 361, 400, 120, 120, 361, 400);
        }

    function ufoMove(){
        if(ufo.y!=100){
                ufo.x += -4;
                ufo.y += 1;
            }
            else{
                if(rojo.y!=100){
                    rojo.x += 3.5
                    rojo.y -= 4;
                }
            }
    }

    function ufoBack(){
        if (rojo.y<=160){
            ufo.x += 10;
            ufo.y -= 3;
            snd.play();
        }
    }

    function movePlay(){
        ufoMove();
        ufoBack();
        nextStage();
    }

    

    function paint(ctx){

        ctx.fillStyle='#000';
        bg.drawImageArea(ctx,spritesheet2, 0, 0, 1100, 600, 120, 120, 1100, 600);

        ctx.fillStyle='#0f0';                                                       //Dibuja el UFO
        ufo.drawImageArea(ctx,spritesheet, 0, 0, 126, 84, 120, 120, 126, 84);   

        if(ufo.y>=100 && rojo.y>=160){
          drawLigth ();
          ctx.fillStyle='#0f0';                                                       //Dibuja la luz
        rojo.drawImageArea(ctx,spritesheet4, 0, 0, 20, 31, 120, 120, 20, 31);  
        }          

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