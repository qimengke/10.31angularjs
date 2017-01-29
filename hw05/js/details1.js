var mySwiper;
$(function(){
	loadSwiper();
	var goodsID = getQueryString("goodsID");
	getImgs(goodsID);
})

function loadSwiper(){
	mySwiper = new Swiper("#swiper-container",{
		autoplay:2000,
		pagination:".swiper-pagination",
		paginationClickable:true
	})
}

