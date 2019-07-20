
getComments();

function getComments(){
	$.get('/comments', function(data){
		console.log("check2");
		if(!data){
			console.log("No data received");
		}
		console.log("Received data: ")
		for(var i = 0; i < data.length; i++){
			console.log(data[i]);
		}
	});
}