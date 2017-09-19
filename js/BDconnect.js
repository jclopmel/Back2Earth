
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
        var player = $("#inputName").val();
        obj = {
           name: player,
           time1: 0,
           time2: null
        };
        newval.child("player").push(obj);
    }

    

/*-----------------------------------------obtener datos para final screen------------------------------------------------*/

    $.get("https://back2earth-1234.firebaseio.com/player/.json", function (data){

            firebase.database().ref("player").on("child_added", snapshot => {
                $("#gameover").prepend("<li><b>Nombre:</b> "+snapshot.val().name+"</li>");
            });

          
       });



        
