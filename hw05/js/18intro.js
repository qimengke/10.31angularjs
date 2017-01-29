
$(function(){
	loadSwiper();
	var goodsID = getQueryString("goodsID");
	getIntroduce(goodsID);
	$(".bottom a").eq(0).on("click",function(){
		$(".bottom a").removeClass();
		$(this).addClass("current");
		$(".time").show();
		getIntroduce(goodsID);
	})
	
	$(".bottom a").eq(1).on("click",function(){
		$(".bottom a").removeClass();
		$(this).addClass("current");
		$(".time").hide();
		
		getGoods(goodsID);
	})
	$(".bottom a").eq(2).on("click",function(){
		$(".bottom a").removeClass();
		$(this).addClass("current");
		$(".time").hide();
		getImgs(goodsID);
	})
})

function loadSwiper(){
	mySwiper = new Swiper("#swiper-container",{
		autoplay:2000,
		loop:true,
		pagination:".swiper-pagination",
		paginationClickable:true,
		longSwipesRatio:0.1
	})
}

function getImgs(goodsID){
	$(".content").empty();
	$(".content").addClass("imgs");
	$(".content").removeClass("detail introduce");
	$.ajax({
		type:"get",
		data:{goodsID:goodsID},
		dataType:"jsonp",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		success:function(data){
			var $container = $("<div class='swiper-container' id='swiper-container'>"+
	    	"<div class='swiper-wrapper'></div>"+"<div class='swiper-pagination'></div>"+
	    	"</div>");
	    	$(".content").append($container);
			var imgs = data[0].imgsUrl;
			var imgsArray = eval(imgs);
//			console.log(imgsArray);
			for (var i = 0; i < imgsArray.length; i++) {
				var $detailImg = $("<div class='swiper-slide'><img src='"+imgsArray[i]+"'/></div>");
				$(".swiper-wrapper").append($detailImg);
			}
			loadSwiper();
		}
	})
}


function getGoods(goodsID){
	$(".content").empty();
	$(".content").addClass("detail");
	$(".content").removeClass("introduce imgs");
	$.ajax({
		type:"get",
		data:{goodsID:goodsID},
		dataType:"jsonp",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		async:true,
		success:function(data){
			var $container = $("<div class='swiper-container' id='swiper-container'>"+
	    	"<div class='swiper-wrapper'></div>"+"<div class='swiper-pagination'></div>"+
	    	"</div>");
	    	$(".content").append($container);
			var imgs = data[0].goodsBenUrl;
			var imgsArray = eval(imgs);
			for(var i = 0; i<imgsArray.length; i++){
				var detailImg = $("<div class='swiper-slide'><img src='"+imgsArray[i]+"'/></div>");
				$(".swiper-wrapper").append(detailImg);
			}
			var textArray =  data[0].detail.split("。")
			for(var i = 0; i<textArray.length;i++){
				var detailText = $("<p>"+textArray[i]+"</p>");
				$(".content").append(detailText);
			}
			loadSwiper();
		}
	});
}


function getIntroduce(goodsID){
	$(".content").empty();
	$(".content").addClass("introduce");
	$(".content").removeClass("detail imgs");
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		data:{goodsID:goodsID},
		dataType:"jsonp",
		async:true,
		success:function(data){
			var $introduce = $("<div class='cloth'>"+
	        	"<img src='"+data[0].goodsListImg+"' >"+
	    	"</div>"+
	    	"<div class='price'>￥"+ data[0].price +" "+data[0].goodsName+"</div>"+
	    	"<div class='circle'></div>"+
	    	"<p>市场价：<del>￥"+data[0].discount*data[0].price+"</del>"+ data[0].discount+"折<span>"+data[0].buynumber+"人购买</span></p>")
			$(".content").append($introduce);
			
		}
	});
}
