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
  var ethnicity = "";
  var height = 0;
  var weight = 0;
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
      ethnicity = childData.queue[3].Ethnicity;
      height = childData.queue[4].Height;
      weight = childData.queue[5].Weight;

      var count = 6;
      while(childData.queue[count].Symptom != null){
      	count++;
      }

      console.log(count);
      dbCounter++;


    });
   addHTML();
});

 function addHTML(){
 	 document.getElementById("underlineName").innerHTML += "<u>" + name + ".</u><br><br>";
 	 document.getElementById("shortd").innerHTML += "<b> " + age + "-year-old " + ethnicity + " " + gender +  "</b><br>";
 	 document.getElementById("hw").innerHTML += "<b> " + height + ",   " + weight + "lbs" + "</b><br>";
 	 BMICalculator();
 } 

 function BMICalculator(){
 	var h = parseInt(height);//ft
 	var h1 = Number(height.substring(2,3));//in
 	var w = Number(weight);
 	var finalHeight = h * 12 + h1;
 	var BMI = Math.round(70300 * w / finalHeight / finalHeight)/100;
 	 document.getElementById("hw").innerHTML += "<br>BMI: "+ BMI + "<br><br>";
 }






