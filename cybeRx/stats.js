//extract the username once again
var username =  parent.document.URL.substring(parent.document.URL.indexOf('=') + 1, parent.document.URL.length);
console.log(username);

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
  var ref = database.ref(username);
  ref.on('value', gotData, errData);
 
 function gotData(data){
 	console.log(data.val());
 }

 function errData(error){
 	console.log("error!");
 	console.log(error);
 }
