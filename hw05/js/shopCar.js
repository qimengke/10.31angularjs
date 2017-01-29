var arr=[];
var userID;
var $totalPrice = $(".total_price");
var totalNum = 0;
var totalPrice = 0;
var $totalNum = $(".total_num");
$(function(){
	userID = getUserID();
	getCar(userID);
	
})
function add(_this){
//	console.log(_this);
	var $num = $(_this).prev();
	var num = $num.val();
	var index = $(_this).parent().parent().index();
	num++;
	$num.val(num);
	totalNum ++;
	$totalNum.text(totalNum);
	updatecar(userID,arr[index].goodsID,num);
	$totalPrice.text("￥"+(parseFloat($totalPrice.text().split("￥")[1])+parseFloat(arr[index].price)))
}

function reduce(_this){
	var $num = $(_this).next();
	var num = $num.val();
	var index = $(_this).parent().parent().index()
	num--;
	$totalPrice.text("￥"+(parseFloat($totalPrice.text().split("￥")[1])-parseFloat(arr[index].price)))	
	totalNum --;
	$totalNum.text(totalNum);
	if(num<=0){
		getShopCar(userID,arr[index].goodsID,0);
		arr.splice(index,1)
		$(_this).parent().parent().remove();
		
	}else{
		$num.val(num);
		
		updatecar(userID,arr[index].goodsID,num);
	}
}

function getCar(userID){
	$.ajax({
		type:"get",
		data:{userID:userID},
		dataType:"jsonp",
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		async:true,
		success:function(data){
			var $content = $(".content");
			if(data == 0){
				$content.empty();
			}
			$content.empty();
			$.each(data, function(index,value) {
			var $dl = $("<dl>"+
					"<dt><img src='"+value.goodsListImg+"'/></dt>"+
					"<dd>"+
					"<p>"+value.goodsName+"</p>"+
					"<p>单价:<span>￥"+value.price+"</span></p>" +
					"<em>数量:</em>"+
					"<div class='reduce' onclick='reduce(this)'>-</div>"+
					"<input type='text' class='num'>"+
					"<div class='add' ontouchstart='add(this)'>+</div>"+
					"</dd>"+
					"<dd>"+
					"<i class='fa fa-trash'></i>"+
					    "<p>L</p>"+
					"</dd>"+
					"</dl>");	
				$content.append($dl);
				totalPrice = totalPrice + parseFloat(value.number*value.price);
				totalNum += parseInt(value.number);
				arr.push({goodsID:value.goodsID,price:value.price});
				$(".num").eq(index).val(value.number);
			});
			$totalNum.text(totalNum);
			$totalPrice.text("￥"+totalPrice.toFixed(1));
		}
	});
}

function updatecar(userID,goodsID,number){
	$.ajax({
		type:"post",
		data:{userID:userID,goodsID:goodsID,number:number},
		url:"http://datainfo.duapp.com/shopdata/updatecar.php",
		async:true,
	});
	
}