var firebaseConfig = {
      apiKey: "AIzaSyC_m9nYNdFnQeEB4Lk0mdgavfvf5HERbO4",
      authDomain: "kwighter.firebaseapp.com",
      databaseURL: "https://kwighter-default-rtdb.firebaseio.com",
      projectId: "kwighter",
      storageBucket: "kwighter.appspot.com",
      messagingSenderId: "912532791137",
      appId: "1:912532791137:web:2cc647d3a3343a6becaf20"
    };
    
    // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("user_name");

  room_name = localStorage.getItem("room_name") ;


  function send() {
      msg = document.getElementById("msg").value ;
      firebase.database().ref(room_name).push({
            name : user_name,
            message : msg,
            like : 0
      }) ;
      document.getElementById("msg").value = ""
  }
  


  







function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id) ;
console.log(message_data) ;
name=message_data['name'] ;
message=message_data['message'] ;
like=message_data['like'];

name_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'> </h4>" ;
message_tag = "<h4 class='message_h4'>" + message + "</h4>" ;
like_button = "<button class='btn btn-success' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>" ;
span_tag = "<span class='glyphicon glyphicon-thumbs-up'> Likes: "+like+"</span></button><hr>" ;

row=name_tag + message_tag + like_button + span_tag ;
document.getElementById("output").innerHTML+=row

//End code
      } });  }); }
getData();

function logout() {

      window.location = "kwitter_room.html"
}


function updateLike(message_id){
      button_id=message_id ;
      likes = document.getElementById(button_id).value ;
      update_like=Number(likes)+1 ;
      firebase.database().ref(room_name).child(message_id).update({
            like:update_like
      })
}