var stage = new Konva.Stage({                               // A las stage se le añaden layers
  container: 'mainContainer',                                     
  width: $("#mainContainer").width(),
  height: $("#mainContainer").height()-17,
});

var layer = new Konva.Layer();                                //canvas de trabajo

var img = new Image();

var arrayPrueba = [];
var arrayPrueba2 = [];

(function (){

     $.getJSON( "http://localhost:8000/js/data.json", function( data ) {

      var dataImg = data.items;
  
      var i=0;
      dataImg.forEach(function(){                                                   //Bucle para cargar todas las imagenes

          var src             = dataImg[i].src;
          var txt             = dataImg[i].txt;
          var width           = dataImg[i].width;
          var height          = dataImg[i].height;
          var inix            = dataImg[i].inix;
          var iniy            = dataImg[i].iniy;

          var img1 = new Konva.Image({
                x: inix,
                y: iniy,
                image: img,
                width: width,
                height: height,
                listening: true,
                draggable: true,
                id:i
              }); 
          arrayPrueba.push(img1);
          arrayPrueba2.push(src);

          /*img.src = src;
          layer.add(img1); */                                                         //Las añade a una misma capa
          i++;
          });

      for (var i=0 ; i<4 ; i++) {
        img.src = arrayPrueba2[i];
        layer.add(arrayPrueba[i]);
        console.log(img);
      }

      window.onload = function (){

              stage.add(layer);                                                             //Añade la capa al canvas

                                                    
            };

      console.log(arrayPrueba);
      console.log(arrayPrueba2);
      console.log(layer);
      console.log(stage);
      console.log(img);
      /*for (var i=0;i<4;i++){
        var rect = new Konva.Rect({
        x: i*10+50,
        y: i*10+50,
        width: 100,
        height: 50,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true
      });

      layer.add(rect);

      
      }
      stage.add(layer);*/
 

        
        /*  img.onload = function (){

              stage.add(layer);                                                             //Añade la capa al canvas

                                                    
            }*/

  });

})(); 


/*

img1.on('mouseover touchend', function() {                 //Object brights when mouseover
    img1.cache();
    img1.filters([Konva.Filters.Brighten]);
    img1.brightness(0.2);

    layer.add(img1);
    stage.add(layer);
    console.log("Que araña tan extraña, ¡tiene nariz!");
    stage.container().style.cursor = 'pointer';
});

img1.on('mouseout touchend', function() {                 //Object return to it default value
    img1.cache();
    img1.filters([Konva.Filters.Brighten]);
    img1.brightness(0);
    stage.container().style.cursor = 'default';         //Change cursor style
    var pos = stage.getPointerPosition();
    
    if(pos.x>=900 && pos.y<=150){                       //Fires an event depending coordinates
      console.log("Lo has conseguido");
    }else{                                              //Move back to initial position

      var tween = new Konva.Tween({
        node: img1,
        duration: 1,
        easing: Konva.Easings.BackEaseInOut,
        x: 5,
        y: 430,
        duration: 3
    });
tween.play();
      
    }
    

    layer.add(img1);
    stage.add(layer);
});

layer.add(img1);
stage.add(layer);

stage.on('contentClick', function() {
      console.log('content click on ' + JSON.stringify(stage.getPointerPosition()));
      return pos=JSON.stringify(stage.getPointerPosition());
    });
*/