$(document).ready(function () {
    $('.loading').fadeOut(1000);
    $('body').removeClass('overflow-hidden ');
})

let currentWidth =$('.sidebar .list').outerWidth();
$('.sidebar').css('left',-currentWidth);
$('.sidebar .logo-and-toggle i').eq(0).click( function(){
    slider ();
})
function slider () {
    if($('.sidebar').css('left') =='0px'){
        $('.sidebar').animate({'left':-currentWidth},100);
        $(this).removeClass('fa-solid fa-xmark fs-3').addClass('fa fs-3 mx-2 mb-1 fa-bars');
        $('.sidebar .list ul li').css('top','100%');
    }
    else {
        $(this).removeClass('fa fs-3 mx-2 mb-1 fa-bars').addClass('fa-solid fa-xmark fs-3');
        $('.sidebar').animate({'left':'0px'},100);
        masterShowMenu();
    }
}
function masterShowMenu() {
    let cont=0;
    let numTop =0;
    let intervalName;
    function showMenu() {
        let listOfLi =$('.sidebar .list ul li');
        $(listOfLi[cont]).css('top',numTop+'%');
        cont++;
        numTop+=13;
        if(cont>5) 
            clearInterval(intervalName);
    }
    intervalName = setInterval(showMenu,100);
}

function validation(typeOfRegx,inputValue,typeInput) {

    if (typeOfRegx.test(inputValue)) {
        typeInput.removeClass('is-invalid');
        typeInput.addClass('is-valid');
    }
    else{
        typeInput.removeClass('is-valid');
        typeInput.addClass('is-invalid');
    }
}

let regxName = /^[A-Za-z]{3,8}$/;
let regxPhone =/^01[0125][0-9]{8}$/;
let regxEmail =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let regxPassword =/^[A-Za-z][0-9]{4,6}$/;
let regxAge =/^[0-9]{2}$/;

$('.contact .container input').eq(0).keyup(function () {
    let typeInput=$(this);
    let inputValue =$(this).val();
    validation(regxName,inputValue,typeInput);
})
$('.contact .container input').eq(1).keyup(function () {
    let typeInput=$(this);
    let inputValue =$(this).val();
    validation(regxPhone,inputValue,typeInput);
    
})
$('.contact .container input').eq(2).keyup(function () {
    let typeInput=$(this);
    let inputValue =$(this).val();
    validation(regxPassword,inputValue,typeInput);
    
})
$('.contact .container input').eq(3).keyup(function () {
    let typeInput=$(this);
    let inputValue =$(this).val();
    validation(regxEmail,inputValue,typeInput);
    
})
$('.contact .container input').eq(4).keyup(function () {
    let typeInput=$(this);
    let inputValue =$(this).val();
    validation(regxAge,inputValue,typeInput);
    
})
$('.contact .container input').eq(5).keyup(function () {
    let typeInput=$(this);
    let inputValue =$(this).val();
    validation(regxPassword,inputValue,typeInput);
    
})

