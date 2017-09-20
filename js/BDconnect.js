
    var config = {
        apiKey: "AIzaSyAkVbI1lQV57a1Q9RO9mlSz1W9NPZXQQxY",
        authDomain: "back2earth-1234.firebaseapp.com",
        databaseURL: "https://back2earth-1234.firebaseio.com",
        projectId: "back2earth-1234",
        storageBucket: "back2earth-1234.appspot.com",
        messagingSenderId: "858443560107"
      };

    firebase.initializeApp(config);
    newval = firebase.database().ref();

/*-----------------------------------------input name en index-----------------------------------------------------*/

    function newPlayer (){
      var date = Date.now();
      var player = $("#inputName").val();
      obj = {
           name: player,
           time1: date,
           time2: 0
      };
      newval.child("player").push(obj);
    }

    

/*-----------------------------------------obtener datos para final screen------------------------------------------------*/
    

    function getTime (t2, t1){
        conver = (t2-t1)/1000;
        minutes = Math.floor(conver/60);
        seconds = conver%60;
    }
    

    $.get("https://back2earth-1234.firebaseio.com/player/.json", function (data){

            firebase.database().ref("player").on("child_added", snapshot => {
              var t1 = snapshot.val().time1;
              var t2 = snapshot.val().time2;
              var conver = (t2-t1)/1000;
              var minutes = Math.floor(conver/60);
              var seconds = Math.floor(conver%60);

              $("#gameover").prepend("<li><b>Nombre:</b> "+snapshot.val().name+" <b> Score:</b>"+minutes+" minutos y "+seconds+" segundos</li>");
            });

          
       });



        
