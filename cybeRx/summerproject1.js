$.getJSON("https://api.betterdoctor.com/2016-03-01/doctors?first_name=Derrick&last_name=Chu&gender=male&skip=0&limit=10&user_key=afbd778310f54f209917a0810b0f8aed", 
function(data){
	console.log(data);
	console.log(data.data[0].profile.bio);
	var info = data.data[0].profile.bio;
	$(".docinfo").append(info);
});

