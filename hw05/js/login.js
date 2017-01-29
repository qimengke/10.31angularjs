var user
$(function(){
	var data = localStorage.getItem("user");
	if(data&&data!=""){
		$("#login_name").val(JSON.parse(data).userID);
		$("#login_pwd").val(JSON.parse(data).password);
		
	}
})
function _login(){
	var name = $("#login_name").val();
	var pwd = $("#login_pwd").val();
	if(name == ""){
		alert("用户名不能为空");
	}else{
		user = getUser(name,pwd);
		toLogin(user);
	}
}
function getUser(name,pwd){
	var user = {
		userID : name,
		password : pwd
	}
	return user;
}

function toLogin(user){
	var check = $("#checked").attr("checked");
	$.get("http://datainfo.duapp.com/shopdata/userinfo.php",							{		status:"login",userID:user.userID,password:user.password},
		function(data){
//			console.log(typeof data)
			if(data.charAt(0) == "{"){
				alert("登录成功");
				if(check){
					var str = '{"userID":"'+user.userID+'","password":"'+user.password+'"}';
		          localStorage.setItem("user",str);
				}
				
			}else if(data == 0){
				alert("用户不存在");
			}else if(data == 2){
				alert("用户名密码不符");
			}
		})
}
