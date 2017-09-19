(function(){

    window.addEventListener('load',startGame,false);


/*--------------------------------------declaracion de variables--------------------------------*/
    
    var canvas          = document.getElementById('canvas'),
        ctx;

    var spritesheet     = new Image();
    spritesheet.src     = "/img/Anim/ufo.png";
    var ufo             = newArea(500,380,149,99);

    var spritesheet2    = new Image();
    spritesheet2.src    = "/img/Stage2/backgound1.jpg";
    var bg              = newArea(0,0,1100,600);
    
    var spritesheet3    = new Image();
    spritesheet3.src    = "/img/Anim/bast.png";
    var bast              = newArea(320,150,210,248);

    var spritesheet4    = new Image();
    spritesheet4.src    = "/img/Anim/rojo2.png";
    var rojo            = newArea(600,150,202,249);

    var contador        = 0;
    var mensajes        = ["¡ jIH tul vetlh chugh maH !",
                            "¡ Alto o disparo !",
                            "Ejem, ¡Vuelve a tu celda!",
                            "No, volveré a La Tierra",
                            "Imposible, estamos en una lluvia de meteoros",
                            "O me ayudas o disparo",
                            "¡nuqneH!, está bien pero deja el arma"]

    var voice             = new Audio ("../sounds/voice.mp3");
    var snd2            = new Audio ("../sounds/alien.mp3");


/*------------------------------Functiones--------------------------------------------*/
    function nextStage(){ 
           location.href="stage2.html";  
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
        contador++;
    }

    function repaint(){                                                     //Pinta el juego a cada cambio
        requestAnimationFrame(repaint);
        paint(ctx);
    }

    function movePlay(){

        if (contador==50 || contador==150 || contador==250){
            snd2.play();
        }
        if(contador==100 || contador==200){
            voice.play();
        }
    }

    function primeraFrase(){
        ctx.fillStyle='white'; 
        ctx.font="30px Georgia white";                          //Alien
        if (contador<=50){
            ctx.fillText(mensajes[0],100,100);
        }else if(contador<=150){
            ctx.fillText(mensajes[2],100,100);
        }else if(contador<=250){
            ctx.fillText(mensajes[4],100,100);
        }else if(contador<=350){
            ctx.fillText(mensajes[6],100,100);
        }else{
            nextStage();
        }
    }
    function segundaFrase(){
        ctx.fillStyle='white'; 
        ctx.font="30px Georgia white";                          //Humano
        if(contador<=100){
            ctx.fillText(mensajes[1],800,100);
        }else if(contador<=200){
            ctx.fillText(mensajes[3],800,100);
        }else if(contador<=300){
            ctx.fillText(mensajes[5],800,100);
        }else{

        }
        
    }


    
/*------------------------------Dibujo del canvas--------------------------------------------*/
    function paint(ctx){


        bg.drawImageArea(ctx,spritesheet2, 0, 0, 1100, 600, 120, 120, 1100, 600);           //Dibuja el UFO
        ufo.drawImageArea(ctx,spritesheet, 0, 0, 149, 99, 120, 120, 149, 99);   
     
        bast.drawImageArea(ctx,spritesheet3, 0, 0, 210, 248, 120, 120, 210, 248);           //Dibuja el alien 

        rojo.drawImageArea(ctx,spritesheet4, 0, 0, 202, 249, 120, 120, 202, 249);           //Dibuja el humano

        primeraFrase();

        segundaFrase();

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