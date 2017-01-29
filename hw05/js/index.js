var myScroll;
$(function(){
	load();
	getData(1);
	//阻止默认事件
	document.addEventListener("touchmove",function(e){
		e.preventDefault();
	})
	$("#wrapper").on("touchend",function(){
		if(myScroll.y>0){
			$("#scollbar").html("");
			getData(1);
		}
		if(myScroll.y<myScroll.maxScrollY-50){
			getData(2);
		}
	})
	$(".find").on("keyup",function(){
		getSearch();
	})
})

function load(){
	myScroll = new IScroll("#wrapper",{
		mouseWheel:true,
		scrollbars:true,
		interactiveScrollbars:false
	})
}
function getData(id){
	$.ajax({
		type:"get",
		dataType:"jsonp",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		data:{classID:id},
		success:function(data){
			if(data.length){
			var $scrollBox = $("#scrollbar");
			$.each(data,function(index,value) {
//				console.log(value)
				var $dl = $("<dl>");
				var $dt = $("<dt>图片加载中...</dt>");
				var $img = $("<img src="+value.goodsListImg+" alt=''>");
				var $dd = $("<dd>"+value.goodsName+"</dd>");
				var $price = $("<div class='price'>"+
				"<span>￥"+value.price+"</span>"+
				"<del>￥"+value.price*value.discount+"</del><br />"+
				"<em>"+value.discount+"折</em>"
				+"</div>");
				var $addCar = $("<div class='addCar'></div>")
				$dl.append($dt);
				$dl.append($dd);
				$dl.append($price);
				$dl.append($addCar);
				$img.on("load",function(){
					myScroll.refresh();
					$dt.empty();
					$dt.append($img);
				})
				$img.on("touchend",function(){
					window.location="18intro.html?goodsID="+encodeURI(value.goodsID);
				})
				
				$addCar.on("touchend",function(){
					var userID = getUserID();
					if(userID){
						getShopCar(userID,value.goodsID,1);
					}else{
						alert("请先登录");
						window.location = "12login.html";
					}
					
				})
				$scrollBox.append($dl);
			});
		}
		}
	});
}

function getSearch(){
	var values = $(".find").val();
	var $box = $(".box");
	if(values.length>2){
		var les = encodeURI(values);
		$.ajax({
			type:"get",
			data:{selectText:les},
			dataType:"jsonp",
			url:"http://datainfo.duapp.com/shopdata/selectGoodes.php",
			async:true,
			success:function(data){
				$.each(data, function(index) {
					var info = $("<li>"+data[index].goodsName+"</li>");
					$box.append(info);
				});
				$box.show();
			}
		});
	}else{
		$box.hide();
		$box.empty();
	}
	
}


