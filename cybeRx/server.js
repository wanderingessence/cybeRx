var words = [];
var corp = "I have some terrible anxiety man";
var firebase = require("firebase");

firebase.initializeApp({
    apiKey: "AIzaSyBPvSqm_MaQhjpK7z0SUbn2ZbxD12MI-9k",
    authDomain: "summerproject1-d1d7c.firebaseapp.com",
    databaseURL: "https://summerproject1-d1d7c.firebaseio.com",
    projectId: "summerproject1-d1d7c",
    storageBucket: "",
    messagingSenderId: "634559623742",
    appId: "1:634559623742:web:882b27c70b1247c2"
  });

var defaultDatabase = firebase.database();
 var ref = defaultDatabase.ref('Chat').orderByKey();
ref.once("value")
  .then(function(snapshot) {
  	snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      var text = childData.corpus;
      console.log(text);
     
  });
  });

console.log("Initialized");

var request = require('request');

var headers = {
    'App-Id': '985fc66a',
    'App-Key': 'e7f6aea2432a9c4106a62a0216ed1d63',
    'Content-Type': 'application/json'
};

var dataString = {
    "sex": "male",
    "age": 30,
    "evidence": [
      {"id": "s_1193", "choice_id": "present"},
      {"id": "s_488", "choice_id": "present"},
      {"id": "s_418", "choice_id": "present"}
    ]
  };

var options = {
    url: 'https://api.infermedica.com/v2/diagnosis',
    method: 'POST',
    headers: headers,
    body: dataString
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

request(options, callback);