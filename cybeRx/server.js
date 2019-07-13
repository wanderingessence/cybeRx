var express = require('express');
var app = express();

app.get('/',function(request, response){
	response.send('Hello, world');
});

app.get('/', function(request, response){
	console.log('GET request received at /comments');
});

app.post('/comments', function(request, response){
	console.log('POST request received at /comments')
})

app.listen(3000, function(){
	console.log("Server is running on port 3000");
}) ;

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');
					const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
					  version: '2019-07-12',
					  iam_apikey: 'RMW0D6GsfrKrTlFw_fQR7ZXzWvlN7p-EY2pcQYF8qOUA',
					  url: 'https://gateway-syd.watsonplatform.net/natural-language-understanding/api'
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