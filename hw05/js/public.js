$(function(){
	$("#back").on("click",function(){
		window.history.back();
	})
})
function getUserID(){
	if(localStorage.getItem("user")){
		return JSON.parse(localStorage.getItem("user")).userID;
	}
	
}

function getQueryString(name){
	
	var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null){
		return decodeURI(r[2]);
	}
	return null;
}

function getShopCar(userID,goodsID,number){
	$.ajax({
		type:"post",
		data:{userID:userID,goodsID:goodsID,number:number},
		url:"http://datainfo.duapp.com/shopdata/updatecar.php",
		async:true,
		success:function(data){
			if(number != 0){
				if(data == 1){
					alert("加入成功");
				}
			}
			
		}
	});
	
}

