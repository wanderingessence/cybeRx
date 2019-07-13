//6277
var array = [];
function getLocation(x) {
  if (navigator.geolocation) {
   	 navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position, user) {
  var arrays = [position.coords.latitude, position.coords.longitude];
  array = arrays;
  return arrays;
}
   	var bio = "";
   	var bioArray = [];
    function say(){
        alert(bio);
    }
function diCey(a){
       		alert(bioArray[a]);
   }
   	userChat = [];
   	botChat = [];
   	function characterBreak(str){
   		var final = "";
   		var char = 0;
   		for (var i = 0; i < str.length; i++) {
   			char++;
  			if(str.charAt(i) == " "){
  				if((char >= 50) && (char <= 65)){
  					final = final + str.charAt(i) + "<br>";
  					char = 0;
  				} else {
  					final = final + str.charAt(i);
  				}
  			}

  			else {
  				final = final + str.charAt(i);
  			}
		}

		return final;
	}
	function parsePhone(str){
		var number = "";
		for(var i = 0; i < str.length; i++){
			if(i == 2 || i == 5){
				number += str.charAt(i) + "-";
			} else {
				number += str.charAt(i);
			}
		}

		return number;
	}
function parseBreak(str){
		var fin = "";
		for(var i = 0; i < str.length; i++){
			var j = i % 65;
			if((i == 60)){
				fin += "<br>";
			}
		}

		return fin;
	}
var type11 = false;
var type12 = false;
var query = "";
getLocation(document.getElementById("userBox"));
function talk() {
var user = document.getElementById("userBox").value;
                console.log(array);
                document.getElementById("userBox").value = "";
                document.getElementById("chat").innerHTML += "<div id = \"youLog\" class = \"chatting\">" + characterBreak(user) +  "</div>" + parseBreak(user) + "<br>";
                if (user == 1) {
                	var string = "Which doctor are you looking for?<br> Press 11 if you are looking for a specific name. <br>ex. <i>David Smith</i><br>Press 12 if you are looking for a specific type of practicioner.<br> ex. <i>Cardiologist near me</i>"
                    document.getElementById("chat").innerHTML += "<div id = \"botLog\" class = \"chatting\">" + string + "</div><br><br>";
                    userChat.push(user);
                    botChat.push(string);
                } else if(user == 11){
                	var string = "Type in the name of the practitioner you are searching for."
                	document.getElementById("chat").innerHTML += "<div id = \"botLog\" class = \"chatting\">" + string + "</div><br>";
                    userChat.push(user);
                    botChat.push(string);
                    type11 = true;
                } else if(user == 12){
                	var string = "What type of practicioner are you looking for?"
                	document.getElementById("chat").innerHTML += "<div id = \"botLog\" class = \"chatting\">" + string + "</div><br>";
                	query = user;
                    userChat.push(user);
                    botChat.push(string);
                    type12 = true;
                }
                 else if(type11 == true){
                	type11 = false;
                	var string = "Nice Doctor name!";
                	var separate = user.split(" ");
                	var firstName = separate[0];
                	var lastName = separate[1];
                    var info = "";
                    var other = "";
                    var address = "";
                    var phoneNumber = "";
                    $.getJSON("https://api.betterdoctor.com/2016-03-01/doctors?first_name=" + firstName + "&last_name=" + lastName + "&skip=0&limit=10&user_key=afbd778310f54f209917a0810b0f8aed",
							function(data){
							bio = data.data[0].profile.bio;
							console.log(data.data[0].profile.bio);
							info += "Dr." +  data.data[0].profile.first_name + " " + data.data[0].profile.last_name + ", " + data.data[0].profile.title + "<br>" + data.data[0].specialties[0].name + "<br><br>";
							var datas = data.data[0];
							var quote ='"';
							if(datas.practices[0] != null){
								address = "<br>" + data.data[0].practices[0].visit_address.street + "<br>" + data.data[0].practices[0].visit_address.city + ", " + data.data[0].practices[0].visit_address.state + " " + data.data[0].practices[0].visit_address.zip + "<br>";
								phoneNumber =  data.data[0].practices[0].phones[0].number;
							}
							info += address;
							if(phoneNumber != undefined){
								info += "<br>"  + parsePhone(phoneNumber);
							}
							info += "<br><br><button class = \"description\" onclick = say()"   +  ">View Description </button>";
							document.getElementById("chat").innerHTML += "<div id = \"botLog\" class = \"chatting\">" + info + "</div>" + parseBreak(info) +  "<br><br>";
                    		userChat.push(characterBreak(user));
                    		botChat.push(characterBreak(info));

					});
                } else if(type12 == true){
                	type12 = false;
                	var input = user;
                	console.log(input);
                	var latitude = array[0];
                	var longitude = array[1];
                	console.log(latitude + ", " + longitude);
                	info = "";
                	$.getJSON("https://api.betterdoctor.com/2016-03-01/doctors?query=" + user + "&location=" + latitude + "%2C%20" + longitude + "%2C50&skip=0&limit=10&user_key=afbd778310f54f209917a0810b0f8aed",
							function(data){

								for(var i = 0; i < 3; i++){
									info = "";
									bio = data.data[i].profile.bio;
									bioArray[i] = bio;
							console.log(data.data[i].profile.bio);
							info += "Dr." +  data.data[i].profile.first_name + " " + data.data[i].profile.last_name + ", " + data.data[i].profile.title + "<br>" +"<br><br>";
							var datas = data.data[i];
							var quote ='"';
							if(datas.practices[i] != null){
								address = "<br>" + data.data[i].practices[i].visit_address.street + "<br>" + data.data[i].practices[i].visit_address.city + ", " + data.data[i].practices[i].visit_address.state + " " + data.data[i].practices[i].visit_address.zip + "<br>";
								if(phoneNumber != undefined){
								phoneNumber =  data.data[i].practices[i].phones[i].number;
							}
							}
							info += address;
							if(phoneNumber != undefined){
							info += "<br>"  + parsePhone(phoneNumber);	
							}
							info += "<br><br><button class = \"description\" onclick = diCey(" + i + ")"   +  ">View Description </button>";
							document.getElementById("chat").innerHTML += "<div id = \"botLog\" class = \"chatting\">" + info + "</div>"  + "<br><br><br><br>";
                    		userChat.push(characterBreak(user));
                    		botChat.push(characterBreak(info));
								}
					});
                } else if(user == 2){
                	console.log("2 pressed");
                	const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');
					const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
					  version: '2019-07-12',
					  iam_apikey: '{RMW0D6GsfrKrTlFw_fQR7ZXzWvlN7p-EY2pcQYF8qOUA}',
					  url: '{https://gateway-syd.watsonplatform.net/natural-language-understanding/api}'
					});
					const analyzeParams = {
					  'url': 'www.ibm.com',
					  'features': {
					    'categories': {
					      'limit': 3
					    }
					  }
					};

					naturalLanguageUnderstanding.analyze(analyzeParams)
					  .then(analysisResults => {
					    console.log(JSON.stringify(analysisResults, null, 2));
					  })
					  .catch(err => {
					    console.log('error:', err);
					  });
                }
                else {
                	var neutral = "I'm sorry I can't parse your text properly Please try typing in one of the options, shown in the welcome statement.";
                    document.getElementById("chat").innerHTML += "<div id = \"botLog\" class = \"chatting\">" + characterBreak(neutral) + "</div><br>";
                    userChat.push(characterBreak(user)) + "<br><br>";
                    botChat.push("I'm sorry I cannot interpret your input properly.<br> Please try typing in one of the options, shown in the welcome statement. <br>");
                }
            } 