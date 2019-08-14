var request = require('request');

var headers = {
    'App-Id': '985fc66a',
    'App-Key': 'e7f6aea2432a9c4106a62a0216ed1d63',
    'Content-Type': 'application/json'
};

var dataString = '{"text": "The doctors are putting all my symptoms off on it being anxiety because they ran three D DIMER tests over the course of a week and a ultrasound of my leg and didnt find anything.. i am severely short of breath i have terrible sensations in my chest and feel like at any minute Ill collapse..they refuse to do a CT scan which will show for sure if i have a pulmonary embolism or not.."}';

var options = {
    url: 'https://api.infermedica.com/v2/parse',
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
