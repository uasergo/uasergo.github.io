var cart = {};

function init(){
    //Загрузить товары
    $.getJSON("goods.json", goodsOut);
}

function goodsOut(data){
    //Вывести товары
    console.log(data); 
    var out='';
    for(var key in data){
        out+='<div class="cart" data-description="'+data[key].order+'">';
        out+='<p class="name">'+data[key].name+'</p>';
        out+='<img src="'+data[key].img+'" alt="" width="400" height="300" >';
        out+='<div class="cost">'+data[key].cost+'</div>';
        out+='<button class="add-to-cart" data-id="'+key+'">Добавить</button>';
        out+='<a href="view.php">';
        out+='<button class="desc-item" data-id="'+key+'">Описание</button>';
        out+='</a>';
        out+='</div>';
    }
    $('.goods-out').html(out);
    $('.add-to-cart').on('click', addToCart);
    $('.desc-item').on('click', descItem);
}

function addToCart(){     
    //Добавить товар в корзину
    var id=$(this).attr('data-id');
    //console.log(id);
    if(cart[id]==undefined){
        cart[id]=1;
    }
    else{
        cart[id]++;
    }
    showMiniCart();
    saveCart();
    
}

function descItem(){
    localStorage.removeItem('chosen');
    var id=$(this).attr('data-id');
    localStorage.setItem('chosen', id); 
};

function saveCart(){
    //Записать корзину в хранилище браузера
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showMiniCart(){
    //Вывести мини-корзину
    $.getJSON('goods.json',function(data){
        var goods=data;
        var out='';
    var counter=0;
    var summary=0;
    for(var key in cart){
        counter+=cart[key];
        summary+=goods[key].cost*cart[key];
    }
    out=counter+" товаров на сумму "+summary;
    $('.mini-cart').html(out);
        if(!isEmpty(cart)){
            $(".cart-shape").hide();
        }
        else{$(".cart-shape").show();}
    });
    
}

function isEmpty(object){
    //Проверить на пустоту
    for(var key in object)
    if(object.hasOwnProperty(key)) return true;
    return false;
}

function loadCart(){
    //Восстановить корзину из хранилища
    if(localStorage.getItem('cart')){
        cart=JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
};

$(document).ready(function(){ //Запуск функций при загрузке
    init();
    loadCart();
    $('.tab').eq(0).css("background", "#9370DB");
    $('.tab').eq(0).css("color", "white");
    $(".tab").on("click", function(){
        $(".tab").css("background", "white"); //анимация вкладок
        $(".tab").css("color", "black");
        $(this).css("background", "#9370DB");
        $(this).css("color", "white");
        var a=$(".tab").last().attr("id");

        ///////////////////////////Вкладки
        var b=$(this).attr("id");
        $(".cart").hide();
        if($(this).attr("id")==0){
                    $(".cart").show();
                }
                else{
        $("[data-description='"+b+"']").show();
                }
        ///////////////////////////
        
    });
    
 
});
