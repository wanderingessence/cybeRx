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
  firebase.initializeApp(firebaseConfig)
  var name = "";
  var age = "";
  var gender = "";
  var ethnicity = "";
  var fhistory = "";
  var height = 0;
  var weight = 0;
  var symptoms = [];
  var dates = [];
  var pain = [];
  var painColor = [];
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
      	symptoms.push(childData.queue[count].Symptom);
      	count++;
      }
      
      dates.push(childData.queue[childData.queue.length - 1].Date);
      pain.push(Number(childData.queue[count].Pain));
      painColor.push(getColor(Number(childData.queue[count].Pain)));
      fhistory += childData.queue[count + 1].FamilyHistory + "<br>";
      console.log(fhistory);

	
      dbCounter++;


    });
    console.log(painColor);
   addHTML();
});

 function addHTML(){
 	 document.getElementById("underlineName").innerHTML += "<u>" + name + ".</u><br><br>";
 	 document.getElementById("shortd").innerHTML += "<b> " + age + "-year-old " + ethnicity + " " + gender +  "</b><br>";
 	 document.getElementById("hw").innerHTML += "<b> " + height + ",   " + weight + "lbs" + "</b><br>";
 	 BMICalculator();

 	 document.getElementById("symptoms").innerHTML += "<strong>Symptoms<br><br></strong><ul>";
      var symptom;
      for(symptom of symptoms){
      	
	document.getElementById("symptoms").innerHTML += "<li>" + symptom + "</li>";
      }
	document.getElementById("symptoms").innerHTML += "<ul>";

 	  let myChart = document.getElementById("myChart").getContext('2d');
 	  myChart.canvas.parentNode.style.height = '700px';
		myChart.canvas.parentNode.style.width = '700px';
       Chart.defaults.global.defaultFontColor = '#C1D3D4';
    let massPopChart = new Chart(myChart, {
      type: 'line', //bar horizontalBar, pie, line, doughnut, radar, polarArea
      data: {
        labels: dates,
        datasets: [{
          label: 'Pain',
          data: pain,
          backgroundColor: painColor,
          fontColor: 'white',
          borderWidth: 1,
          hoverBorderWidth: 3,
          hoverBorderColor: 'white',
          borderColor: 'gray'
        }]
      },
      options: {
        title:{
          display:true,
          text: 'Pain Level',
          fontSize: 25
        },
        legend:{
          position: 'right',
         labels: {
                // This more specific font property overrides the global property
                fontColor: 'white'
            }
        },
        padding:{
          left: 50
        },
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 10
                }
            }]
        }
    
      }
    });



 } 




 function BMICalculator(){
 	var h = parseInt(height);//ft
 	var h1 = Number(height.substring(2,3));//in
 	var w = Number(weight);
 	var finalHeight = h * 12 + h1;
 	var BMI = Math.round(70300 * w / finalHeight / finalHeight)/100;
 	 document.getElementById("hw").innerHTML += "<br>BMI: "+ BMI + "<br><br>";
 }


function getColor(number){
	var color = "blue";
	//switch statement
	switch (number){
		case 1:return 'green';
		case 2:return 'green';
		case 3: return 'yellow';
		case 4: return 'yellow';
		case 5: return 'yellow';
		case 6: return 'orange';
		case 7: return 'orange';
		case 8: return 'red';
		case 9: return 'red';
		case 10: return 'brown';
		default: return 'orange';

	}
}





