$(function(){
	
	$("#register_btn").click(function(){
		var name = $("#register_name").val();
		var pwd = $("#register_pwd").val();
		var repwd = $("#register_repwd").val();
		if(name == ""){
			alert("请输入用户名");
			
		}else{
			if(pwd == ""){
				alert("请输入密码");
			}else{
				if(pwd !== repwd){
					alert("两次密码输入不一致");
				}else{
					var user = getUser(name,pwd);
					toRegister(user);
					window.open("12login.html");
				}
			}
		}
	})
	function getUser(name,pwd){
		var user = {
			userID : name,
			password : pwd
		}
		return user;
	}
	function toRegister(user){
		
		$.ajax({
			type:"post",
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			data:{status:"register",userID:user.userID,password:user.password},
			success:function(data){
				if(data == 0){
					alert("用户名重名");
				}else if(data == 1){
					alert("亲 注册成功");
				}else if(data == 2){
					alert("浏览器出现异常");
				}
			}
		});
	}
})
