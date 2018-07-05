<!DOCTYPE html>
<html lang="ru"> 
<head>
    <meta charset="UTF-8"> 
    <title>Корзина</title> 
    <link rel="stylesheet" href="css/style.css"> 
</head>
<body>
<header>
ESHOP.COM
</header>
<br>
<div class="bordemaroon">
<main align="left" style="margin-left: 40%; margin-right: 20%">  
    <h1>Корзина</h1>
    <div class="main-cart"></div> <!-- Для корзины -->
    <br>
    <button class="reset-cart">Очистить корзину</button>
    <br>
    <p style="font-size: 25px; font-weight: bold">Как с вами связаться?</p>
    <div class="email-field"> <!-- Форма для отправки контактных данных -->    
        <p>Имя: <input type="text" id="ename"></p> 
        <p>Почта: <input type="text" id="email"></p>
        <p>Телефон: <input type="text" id="ephone"></p>
        <p><button class="send-email">Сделать заказ</button></p>
        <p><button class="reset-form">Очистить форму</button></p>
        <a href="index.php"><button class="to-main" style="margin: 0px; width: 200px">К выбору</button></a>
    </div>
</main>
</div>
<footer></footer>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="js/cart.js"></script>
</body>
</html>