
(function (){

    var stage = new Konva.Stage({                               // A las stage se le añaden layers
      container: 'mainContainer',                                     
      width: $("#mainContainer").width(),
      height: $("#mainContainer").height()-17,
    });

    var layer = new Konva.Layer();
    stage.add(layer);
    var buttonX     = [442,522,600,425,507,583,409,489,568];
    var buttonY     = [153,153,153,271,271,271,385,385,385];
    var secretCode  = [2,1,0,3,4,7];
    var currentCode = [];

    var snd = new Audio("./sounds/gateOpen.wav");
    var snd2 = new Audio ("./sounds/sniff.wav");
    var snd3 = new Audio ("./sounds/duda.wav");
    console.time("t1");

    

    /*--------------------------------------Funcion para cambiar de fase-------------------------------------------*/

    function nextStage(){   
      location.href="stage2.html";
    } 

    /*--------------------------------------Funcion de crear circulos-------------------------------------------*/

    function circleButton (){
        for(var i=0;i<buttonX.length;i++){
            var circleButton = new Konva.Circle({
              x: buttonX[i],
              y: buttonY[i],
              radius: 20,
              fill: 'grey',
              stroke: 'white',
              strokeWidth: 2,
              id:i
            });
        layer.add(circleButton);
        }
        
    }

    /*--------------------------------------Código para abrir la puerta-------------------------------------------*/


    function checkCode(){
                for(var i=0; i<buttonX.length;i++){
                    if (shape.attrs.x==buttonX[i] && shape.attrs.y==buttonY[i]){
                        currentCode.push(i);                    
                        }
                }
                if (currentCode.includes(2) && currentCode.includes(1) && currentCode.includes(0) && currentCode.includes(3) && currentCode.includes(4) && currentCode.includes(7)){
                        $("#mainContainer").css('background-image','url("./img/celda5b.jpg")');
                        stage.find("Circle").destroy();
                        snd.play();
                        rojo.draggable(true);
                }

                /*if(currentCode[0]==secretCode[0] && currentCode[1]==secretCode[1] && currentCode[2]==secretCode[2] && currentCode[3]==secretCode[3] && currentCode[4]==secretCode[4] && currentCode[5]==secretCode[5] && currentCode[6]==secretCode[6]){
                        console.log("Puerta abierta!!!!");
                        $("#mainContainer").css('background-image','url("../img/celda5b.jpg")');
                        stage.find("Circle").destroy();
                }*/
    }


    /*--------------------------------------Funcion de desplazamiento de los items-------------------------------------------*/
    var shape;
    function tweenPlay (shape){                            
        var tween = new Konva.Tween({
                node: shape,
                duration: 1,
                easing: Konva.Easings.BackEaseInOut,
                x: posx,
                y: posy,
                duration: 3
            });
        tween.play();
    }
    /*--------------------------------------Remove container and fadeOut after delay-------------------------------------------*/
    function removeDiv (){ 
            $("#message").remove();
    }

    function fadeOut (){
        $("#message").delay(1000).fadeOut("slow");
    }

    /*-----------------------------------------------mirror image load -----------------------------------------*/
    var mirror = new Konva.Image({
        x: 1020,
        y: 45,
        width: 70,
        height: 70,
        draggable: false,
        txt: "Este cristal puede que me sirva para mirar lo que hay ahí fuera, pero necesitaría algo mas al que agarrarlo"
    });
    layer.add(mirror);

    var imageObj3 = new Image();
    imageObj3.onload = function() {
        mirror.image(imageObj3);
        layer.draw();
    };
    imageObj3.src = './img/espejo2.png';

    /*-----------------------------------------------Alien image load -----------------------------------------*/
    var alienSkin = new Konva.Image({
        x: 5,
        y: 430,
        width: 150,
        height: 150,
        draggable: true,
        txt: "La piel muerta de algún bicho, ¡qué mal huele!"
    });
    layer.add(alienSkin);

    var imageObj1 = new Image();
    imageObj1.onload = function() {
        alienSkin.image(imageObj1);
        layer.draw();
    };
    imageObj1.src = './img/alienskin.png';


    /*-----------------------------------------------Spider image load -----------------------------------------*/
    var olarana = new Konva.Image({
        x: 1030,
        y: 20,
        width: 70,
        height: 70,
        draggable: true,
        txt: "Que araña tan extraña, ¡tiene nariz!"
    });
    layer.add(olarana);

    var imageObj2 = new Image();
    imageObj2.onload = function() {
        olarana.image(imageObj2);
        layer.draw();
    };
    imageObj2.src = './img/olarana02.png';

    /*-----------------------------------------------Horn image load -----------------------------------------*/
    var horn = new Konva.Image({
        x: 850,
        y: 410,
        width: 120,
        height: 120,
        draggable: false,
        txt: "Quizás pueda serme de utilidad, ¿pero para qué?",
    });
    layer.add(horn);

    var imageObj4 = new Image();
    imageObj4.onload = function() {
        horn.image(imageObj4);
        layer.draw();
    };
    imageObj4.src = './img/cuerno.png';

    /*-----------------------------------------------Rojo image load -----------------------------------------*/
    var rojo = new Konva.Image({
        x: 400,
        y: 150,
        width: 150,
        height: 400,
        draggable: false,
        txt: "Si pudiese ver la cerradura de la puerta, desde el otro lado..."
    });
    layer.add(rojo);

    var imageObj5 = new Image();
    imageObj5.onload = function() {
        rojo.image(imageObj5);
        layer.draw();
    };
    imageObj5.src = './img/rojoFront.png';

    /*-----------------------------------------------newHorn image load -----------------------------------------*/
    var newHorn = new Konva.Image({
        x: 840,
        y: 410,
        draggable: true,
        txt: "Con esto podré mirar la cerradura y lo que hay ahí fuera.",
        visible: false
    });
    layer.add(newHorn);

    var imageObj6 = new Image();
    imageObj6.onload = function() {
        newHorn.image(imageObj6);
        layer.draw();
    };
    imageObj6.src = './img/newHorn.png';

    /*-----------------------------------------------sideViewRight image load -----------------------------------------*/
    function sideView(){
            var sideView = new Konva.Image({
                x: 250,
                y: 10,
                visible: true
            });
            layer.add(sideView);

            var imageObj7 = new Image();
            imageObj7.onload = function() {
                sideView.image(imageObj7);
                layer.draw();
            };
            imageObj7.src = './img/sideView3.png';

            //hoverZoom();                                                       quitar zoom que da prolemas sino lo arreglo
            stage.on('contentClick', function() {
                sideView.hide();
                newHorn.show();
            });
    }


    /*-----------------------------------------------sideViewLeft image load -----------------------------------------*/
    function leftView(){
            var leftView = new Konva.Image({
                x: 250,
                y: 10,
                visible: true
            });
            layer.add(leftView);

            var imageObj8 = new Image();
            imageObj8.onload = function() {
                leftView.image(imageObj8);
                layer.draw();
            };
            imageObj8.src = './img/sideView4.png';

            stage.on('contentClick', function() {
                leftView.hide();
                newHorn.show();
            });
    }

    /*-----------------------------------------------screen image load -----------------------------------------*/
    function screen(){
                    var screen = new Konva.Image({
                        x: 250,
                        y: 10,
                        visible: true
                    });
                    layer.add(screen);

                    var imageObj8 = new Image();
                    imageObj8.onload = function() {
                        screen.image(imageObj8);
                        layer.draw();
                    };
                    imageObj8.src = './img/screen.png';

                    /*if (stage.find("Circle").length<1){*/
                        circleButton();
                   /* }else{
                        stage.find("Circle").show();
                    }
    */
                    

                    layer.on('mouseover', function(evt) {                   //Condicional del patrón a insertar
                        var shape = evt.target;
                        checkCode();
                        
                    });

                    stage.on('contentClick', function() {               //Cierre del panel
                        currentCode = [];
                        stage.find("Circle").destroy();
                        screen.hide();
                        newHorn.show();
                    });
    }


    /*-----------------------------------------------Events on mouseover -----------------------------------------*/
    var posx;
    var posy;
    layer.on('mouseover', function(evt) {
        var shape = evt.target;
        document.body.style.cursor = 'pointer';
        shape.cache();
        shape.filters([Konva.Filters.Brighten]);
        shape.brightness(0.1);
        layer.draw();

        posx=shape.attrs.x;
        posy=shape.attrs.y;                                                 //Pointer localitation
                             

        removeDiv();
        if(shape.attrs.x==1020){                                            //Message condition
                $("#mainContainer").before("<div id='message' class='message'><p>"+mirror.attrs.txt+"</p></div>");
            }else if(shape.attrs.x==1030){                                     
                $("#mainContainer").before("<div id='message' class='message'><p>"+olarana.attrs.txt+"</p></div>");
                snd2.play();
            }else if(shape.attrs.x==5){
                $("#mainContainer").before("<div id='message' class='message'><p>"+alienSkin.attrs.txt+"</p></div>");
            }else if(shape.attrs.x==850){
                $("#mainContainer").before("<div id='message' class='message'><p>"+horn.attrs.txt+"</p></div>");
            }else if(shape.attrs.x==400){
                $("#mainContainer").before("<div id='message' class='message'><p>"+rojo.attrs.txt+"</p></div>");
                snd3.play();
            }else if(shape.attrs.x==840){
                $("#mainContainer").before("<div id='message' class='message'><p>"+newHorn.attrs.txt+"</p></div>");
            }else{};
            fadeOut();
    });

    layer.on('mouseout', function(evt) {
        shape = evt.target;
        document.body.style.cursor = 'default';
        shape.cache();
        shape.filters([Konva.Filters.Brighten]);
        shape.brightness(0);
        layer.draw();
        var pos = stage.getPointerPosition();

        posxout=shape.attrs.x;
        posyout=shape.attrs.y;

        if(shape.attrs.txt==alienSkin.attrs.txt && posxout>=900 && posyout<=100){                                            //Message condition
                $("#mainContainer").before("<div id='message' class='message'><p>"+"La araña se ha marchado por el mal olor, ¡que peste!"+"</p></div>");
                olarana.hide();
                alienSkin.hide();
                mirror.draggable(true);

            }else if(shape.attrs.txt==mirror.attrs.txt && posxout>=800 && posyout>=400){                                            //Message condition
               $("#mainContainer").before("<div id='message' class='message'><p>"+"Quizás pueda agarrarlo de alguna forma"+"</p></div>");
                mirror.hide();
                horn.hide();
                newHorn.show();
            }else if(shape.attrs.txt==newHorn.attrs.txt && posxout>=520 && posyout>=240 && posxout<=735 && posyout<=450){
                newHorn.hide();
                screen();
            }else if(shape.attrs.txt==newHorn.attrs.txt && posxout>=720 && posyout>=79 && posxout<=900 && posyout<=390){
                newHorn.hide();
                sideView();
            }else if(shape.attrs.txt==newHorn.attrs.txt && posxout>=-50 && posyout>=70 && posxout<=100 && posyout<=410){
                newHorn.hide();
                leftView();
            }else if(shape.attrs.txt==rojo.attrs.txt && posxout>=350 && posyout>=0 && posxout<=750 && posyout<=140){
                startTime = console.timeEnd("t1");
                nextStage();
            }else{
                tweenPlay(shape);
                    };
            
            /*console.log(shape.attrs.txt);
            console.log(rojo.attrs.txt);
            console.log(posxout);
            console.log(posyout);*/
        
    });


    /*stage.on('contentClick', function() {
          console.log('content click on ' + JSON.stringify(stage.getPointerPosition()));
          return pos=JSON.stringify(stage.getPointerPosition());
          
        });*/
}());