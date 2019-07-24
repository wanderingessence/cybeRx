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
  var database = firebase.database();
  var ref = database.ref('User').orderByKey();
  var found = false;
  function login(){
       var password= document.getElementById("password").value;
    var username = document.getElementById("username").value;
//     ref.once("value")
//   .then(function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//       var key = childSnapshot.key;
//       var childData = childSnapshot.val();
//       var username = childData.username;
//       var password = atob(childData.password);
//       var passwordy= document.getElementById("password").value;
//     var usernamey = document.getElementById("username").value;
//         if(passwordy == password && usernamey == username){
//             alert("User authenticated :D");
//             found = true;
//             document.location.href = "chat.html";
//             return;
//         }
//   });
//     if(!found){
//         alert("Incorrect username/password combination");
//         return;

//     }
// });

var errorPresent = false;
 firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
          // Handle Errors here.
          if(error){
            alert("signup error");
            errorPresent = true;
          } 
             

         
          // [END_EXCLUDE]
        });

      var user = firebase.auth().currentUser;

   document.location.href = "chat.html?id=" + user.uid;
        

  }
  function signup(){
//     var ref = database.ref('User');
    var password= document.getElementById("password").value;
    var username = document.getElementById("username").value;
//     if(username.length < 5){
//         alert("For Security Reasons, please make your username has at least 5 characters.")
//         return;
//     }
//     if(password.length < 8){
//         alert("For Security Reasons, please make your password has at least 8 characters.");
//         return;
//     }

//      var data = {
//     username: username,
//     password: btoa(password)
//   }
//   var found = false;

//      ref.once("value")
//     .then(function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//       var key = childSnapshot.key;
//       var childData = childSnapshot.val();
//       var username = childData.username;
//     var usernamey = document.getElementById("username").value;
//         if(usernamey == username){
//             alert("This user already exists.");
//             found = true;
//         }
//   });
//     if(found == false){
//         ref.push(data);
//         alert("Sign up Successful. Please Log in.");
//     }
// });

firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if(error){
    console.log(errorCode + " " + errorMessage);
  }
  var user = firebase.auth().currentUser;

   document.location.href = "chat.html?id=" + user.uid;
});
  }

  
