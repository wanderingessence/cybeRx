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
//db.run('CREATE TABLE langas(name,text, diagnostics)');
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
var username = request.body.user;
var idArray = [];
db.run('INSERT INTO langas(name,text,diagnostics) VALUES (?, ?,?)', ["", "",""], function(err, rows){
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
    url: 'https://api.infermedica.com/v2/parse',//ordiagnosis
    method: 'POST',
    headers: headers,
    body: dataString
};

function callback(error, response, body) {
    
    if (!error && response.statusCode == 200) {
       var jsonArray = JSON.parse(body);
       for(var i = 0; i < jsonArray.mentions.length; i++){
            idArray.push(jsonArray.mentions[i].id);
       }
       var dataString2 = '{"sex": "male","age": 25,"evidence": [';
       for(var j = 0; j < idArray.length; j++){
        dataString2 += '{"id": "' + idArray[j] + '", "choice_id": "present", "initial": true}';
        if(j != idArray.length - 1){
            dataString2 += ',';
        }
       }

       dataString2 += '],"extras": {"disable_groups": true} }';


var options2 = {
    url: 'https://api.infermedica.com/v2/diagnosis',//ordiagnosis
    method: 'POST',
    headers: headers,
    body: dataString2
};


function callback2(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
        var diseases  = "";
        var json2 = JSON.parse(body);
        console.log("condition length is " + json2.conditions.length);
        for(var k = 0; k < json2.conditions.length; k++){
            if(k != json2.conditions.length - 1){
                diseases += json2.conditions[k].name + "(" +  json2.conditions[k].probability + "), ";
            } else {
                diseases += " and " + json2.conditions[k].name + "(" +  json2.conditions[k].probability + ").";
            }
            
        }
         db.run('INSERT INTO langas(name, text, diagnostics) VALUES (?, ?, ?)', [request.body.user, request.body.comment, diseases], function(err, rows){
        
        if(err){
            console.log("Error: " + err);
        }  else {
            console.log("done :)")
        }
    });
    }
}

req(options2, callback2);

       
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




