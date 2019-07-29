//extract the username once again
//tip: Use a default operator 
var username =  parent.document.URL.substring(parent.document.URL.indexOf('=') + 1, parent.document.URL.length);
var firebaseConfig = {
    apiKey: "AIzaSyBPvSqm_MaQhjpK7z0SUbn2ZbxD12MI-9k",
    authDomain: "summerproject1-d1d7c.firebaseapp.com",
    databaseURL: "https://summerproject1-d1d7c.firebaseio.com",
    projectId: "summerproject1-d1d7c",
    storageBucket: "",
    messagingSenderId: "634559623742",
    appId: "1:634559623742:web:882b27c70b1247c2"
  };
  firebase.initializeApp(firebaseConfig);
  var name = "";
  var age = "";
  var gender = "";
  var database = firebase.database();
  var ref = database.ref(username);
  var dbCounter = 0;
 ref.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      console.log(childData);
      name = childData.queue[0].Name;
      age = Number(childData.queue[1].Age);
      if(childData.queue[2].Gender == "M"){
      	gender = "Male";
      } 

      if(childData.queue[2].Gender == "F"){
      	gender = "Female";
      } 

      console.log(age);
      dbCounter++;
    });
   addHTML();
});

 function addHTML(){
 	 document.getElementById("underlineName").innerHTML += "<b><u>" + name + ".</u></b><br><br>";
 	 document.getElementById("age").innerHTML += "<b>Age: " + age + "</b><br><br>";
 	 document.getElementById("gender").innerHTML += "<b>Gender: " + gender + "</b><br><br>";
 }




