var cart = {};

function loadCart(){
    //Восстановить корзину из хранилища
    if(localStorage.getItem('cart')){
        cart=JSON.parse(localStorage.getItem('cart'));
        
            showCart();
    }
    else{
        $('.main-cart').html('Корзина пуста');
    }
}

function showCart(){
    //Вывести корзину
    if(!isEmpty(cart)){
        $('.main-cart').html('Корзина пуста');
    }
    else{
        $.getJSON('goods.json', function(data){
            var goods=data;
            var out='';
            for(var key in cart){
                out+='<button data-id="'+key+'" class="del-goods">x</button>';
                out+='<img src="'+goods[key].img+'">';
                out+=' '+goods[key].name+' ';
                out+='<button data-id="'+key+'" class="minus-goods">-</button>';
                out+=' '+cart[key]+' ';
                out+='<button data-id="'+key+'" class="plus-goods">+</button>';
                out+=' '+cart[key]*goods[key].cost+' ';
                out+='<br>';
            }
            $('.main-cart').html(out);
            $('.del-goods').on('click',delGoods);
            $('.plus-goods').on('click',plusGoods);
            $('.minus-goods').on('click',minusGoods);
            $('.reset-cart').on('click', function(){ 
                for(var key in cart){
                delete cart[key];
                }
            saveCart();
            showCart();
            });
        });
    }
}

function delGoods(){
    //Удалить товар
    var id=$(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}

function plusGoods(){
    //Увеличить на 1
    var id=$(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}

function minusGoods(){
    //Уменьшить на 1
    var id=$(this).attr('data-id');
    if(cart[id]==1){
        delete cart[id];
    }
    else{
    cart[id]--;  
    }
    saveCart();
    showCart();
}

function saveCart(){
    //Сохранить в хранилище
    localStorage.setItem('cart', JSON.stringify(cart));
}

function isEmpty(object){
    //Проверить на пустоту
    for(var key in object)
    if(object.hasOwnProperty(key)) return true;
    return false;
}

function sendEmail(){
    //Запрос на почтовый сервис
    var ename=$('#ename').val();
    var email=$('#email').val();
    var ephone=$('#ephone').val();
    if(ename!='' && email!='' && ephone!=''){
        if(isEmpty(cart)){
            $.post("core/mail.php",{
               "ename" : ename,
                "email" : email,
                "ephone" : ephone,
                "cart" : cart
            },
            function(data){
               if(data==1){
                   alert('Заказ принят!');
               } 
               else{
                   alert('Повторите заказ!');
               }
            }
            );
        }
        else{
        alert('В корзине ничего нет!');
        }
    }
    else{
        alert('Заполните все поля!');
    }
    
}

$(document).ready(function(){
    //Запуск при загрузке
   loadCart();
$('.send-email').on('click',sendEmail);  
$('.reset-form').on('click',function(){
     $('#ename').val('');
     $('#email').val('');
     $('#ephone').val('');
    }); 
});
































