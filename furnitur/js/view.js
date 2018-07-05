var cart = {};

function init(){
    //Загрузить товары
    $.getJSON("goods.json", goodsOut);
}


function goodsOut(data){
    //Вывести товары
    console.log(data); 
    var out='';
    var key=localStorage["chosen"];
        out+='<div class="look" data-description="'+data[key].order+'">';
        out+='<img src="'+data[key].img+'" alt="" width="400" height="300" style="padding: 50px">';
        out+='</div>';
        out+='<div class="comment">Название:</div><p class="name">'+data[key].name+'</p>';
        out+='<div class="comment">Стоимость:</div><div class="cost">'+data[key].cost+'$</div>';
        out+='<div class="comment">Описание:</div><br><div class="desc">'+data[key].description+'</div>';
        out+='<button class="add-to-cart" data-id="'+key+'">Добавить</button>';
        out+='<a href="cart.php"><button class="to-cart">К корзине</button></a>';
        out+='<a href="index.php"><button class="to-main">К выбору</button></a>';
    $('.board').html(out);
    $('.add-to-cart').on('click', addToCart);
}

$(document).ready(function(){ //Запуск функций при загрузке
    init(); 
    loadCart();    
    });
    
    
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

function saveCart(){
    //Записать корзину в хранилище браузера
    localStorage.setItem('cart', JSON.stringify(cart));
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