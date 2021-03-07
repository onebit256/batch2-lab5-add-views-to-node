


var loginLayer = {
	
	login:function(){
		$(".error-info").html("");
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		if(username == "" || password == ""){
			$(".error-info").html("请输入用户名和密码");
			return;
		}
		if(username == "admin" && password == "123456"){
			localStorage.setItem("login", "1");
			window.location.href = "index.html";
		}
		else{
			$(".error-info").html("用户名或密码错误");
		}
	}
			
}