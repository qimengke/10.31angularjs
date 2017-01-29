$(function(){
	var userID =  getUserID();
		if(userID){
			$("#user_id").text("昵称："+userID);
		}else{
			$("#user_id").text("昵称：未知");
			
		}
})
