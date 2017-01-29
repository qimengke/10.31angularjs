var myScroll;
$(function(){
	load();
	getData(1);
})
function load(){
	myScroll = new IScroll("#wrapper",{
		mouseWheel:true,
		scollbars:true,
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
				var $dl = $("<dl>");
				var $dt = $("<dt>图片加载中...</dt>");
				var $img = $("<img src="+value.goodsListImg+" alt=''>")
				var $dd = $("<dd>"+
				"<p>"+value.goodsName+"</p>"+
				"<p>【买一赠一】</p>"+
				"<p>单价:<span>￥"+value.price*value.discount+"</span></p>"+
				"<p>"+value.discount+"折<del>￥"+value.price+"</del></p>"+
				"<div class='button'>"+
			                "<i class='fa fa-cart-arrow-down'></i>"+
			            "</div>"
				+"</dd>");
				$dl.append($dt);
				$dl.append($dd);
				$img.on("load",function(){
					myScroll.refresh();
					$dt.empty();
					$dt.append($img);
				})
				$scrollBox.append($dl);
			});
		}
		}
	});
}
