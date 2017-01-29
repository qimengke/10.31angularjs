var mySwiper;
$(function(){
	loadSwiper();
	var goodsID = getQueryString("goodsID");
	console.log(goodsID);
	getGoods(goodsID);
})





