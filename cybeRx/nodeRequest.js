var os = require( 'os' );
const interfaces = os.networkInterfaces();
const addresses = [];
var getMacAddress;
var express = require('express');
var sqlite3 = require('sqlite3');
var bodyParser = require('body-parser');
var ip = require("ip");
var address = ip.address();
var db = new sqlite3.Database('comments.db');
var app = express();
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: false}));
var corpus;
//db.run('CREATE TABLE langas(name,text)');
app.get('/comments', function(request, response){
    console.log('GET request received at /comments');
    db.all('SELECT * FROM langas', function(err, rows){
        if(err){
            console.log("Error: " + err);
        } //else {
          //  console.log(rows);
            //response.send(rows);
            //pass rows back to the client
        //}
    });
}); 
//runs once a user submits a comment
app.post('/comments', function(request, response){
var complaint = request.body.comment + ".";
db.run('INSERT INTO langas(name,text) VALUES (?, ?)', [request.body.user,request.body.comment], function(err, rows){
if(err){
    console.log("INSERT INTO " + err.message);
} else {
var req = require('request');
var headers = {
    'App-Id': '985fc66a',
    'App-Key': 'e7f6aea2432a9c4106a62a0216ed1d63',
    'Content-Type': 'application/json'
};

var dataString = '{"text":' + '"' + complaint + '"' + '}';
var options = {
    url: 'https://api.infermedica.com/v2/parse',
    method: 'POST',
    headers: headers,
    body: dataString
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(JSON.parse(body));
    } else {
       // console.log(error + " is the error");
        console.log(response.statusCode);
    }
}
req(options, callback);
response.status(200).redirect('chat.html?id=' + request.body.user);
        }
    });
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

var admin = require("firebase-admin");
var firebaseConfig = {
    apiKey: "AIzaSyBPvSqm_MaQhjpK7z0SUbn2ZbxD12MI-9k",
    authDomain: "summerproject1-d1d7c.firebaseapp.com",
    databaseURL: "https://summerproject1-d1d7c.firebaseio.com",
    projectId: "summerproject1-d1d7c",
    storageBucket: "",
    messagingSenderId: "634559623742",
    appId: "1:634559623742:web:882b27c70b1247c2"
};
admin.initializeApp(firebaseConfig);



