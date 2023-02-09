$(document).ready(function () {
    $('.loading').fadeOut(1000);
    $('body').removeClass('overflow-hidden ');
})

let currentWidth =$('.sidebar .list').outerWidth();
$('.sidebar').css('left',-currentWidth);
$('.sidebar .logo-and-toggle i').eq(0).click( function(){
    slider ()
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
        $(listOfLi[cont]).css('top',numTop+'%')
        cont++;
        numTop+=13;
        if(cont>5) 
            clearInterval(intervalName)
    }
    intervalName = setInterval(showMenu,100);
}

async function getDataOfCategories(){
    let response = await fetch ('https://www.themealdb.com/api/json/v1/1/categories.php');
    let {categories} = await response.json();
    DisplayData (categories);
    setAndGetnameOfCategory();
}

function DisplayData (meals) {
    let cartoona="";
    meals.map((item)=>{
        cartoona+=`
        <div class="item col-md-6 col-lg-4 col-xl-3">
                <div nameOfCategory=${item.strCategory} class="box  rounded-4 overflow-hidden">
                    <img class="w-100" src="${item.strCategoryThumb}" alt="">
                    <div class="lier p-3 overflow-auto d-flex flex-column text-center overflow-hidden ">
                        <h6 class="fs-3">${item.strCategory}</h6>
                        <p class="p-3">${item.strCategoryDescription.split(' ').splice(0,15).join(' ')}</p>
                    </div>
                </div>
            </div>
        `
    })
    document.querySelector('.row').innerHTML=cartoona;
}
function setAndGetnameOfCategory() {
    let x=$('.item .box').click(function () {
        let nameOfCategory=$(this).attr("nameOfCategory");
            localStorage.setItem('nameOfCategory',nameOfCategory);
            open('RelatedToTheCategory.html' ,'_self');
    })
    
}
getDataOfCategories()

