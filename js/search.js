
function Louding() {
    $('.loading').fadeIn(10);
    if( $(document).ready()){
        $('.loading').fadeOut(1000);
        $('body').removeClass('overflow-hidden ');
    }
    
}
Louding()
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


function setIdOfItem() {
    $('.item .box').click(function () {
        let idMeal=$(this).attr("idMeal");
        localStorage.setItem('idMeal',idMeal);
        open('itemDetailes.html' ,'_self');
    })
    
}
$('#searchByName').keyup(function () {
    let nameOfMeal =$(this).val();
    getDataOfName(nameOfMeal);
})
$('#searchByLetter').keyup(function () {
    let letterOfMeal =$(this).val();
    getDataOfLetter(letterOfMeal);
})

async function getDataOfName(nameOfMeal) {
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameOfMeal}`);
    let{meals} = await response.json();
    if(meals){
        DisplayDataOfSearch(meals);
        setIdOfItem();
    }
    else{
        let error=`<div class="text-white text-center "><h1 class="text-danger">NO RESULTS FOUND</h1></div>`;
        document.querySelector('.row').innerHTML=error;
    }
} 
async function getDataOfLetter(letterOfMeal) {
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?f=${letterOfMeal}`);
    let{meals} = await response.json();
    if(meals){
        DisplayDataOfSearch(meals);
        setIdOfItem();
    }
    else{
        let error=`<div class="text-white text-center "><h1 class="text-danger">NO RESULTS FOUND</h1></div>`;
        document.querySelector('.row').innerHTML=error;
    }
} 
function DisplayDataOfSearch (meals) {
    let cartoona='';
    meals.map((item)=>{
        cartoona+=`
        <div class="item  col-md-6 col-lg-4 col-xl-3">
                <div idMeal= ${item.idMeal} class=" box rounded-4 overflow-hidden">
                    <img  class="w-100" src="${item.strMealThumb}" alt="">
                    <div class="lier"><p class="fs-3">${item.strMeal}</p></div>
                </div>
            </div>
        `
    })
    document.querySelector('.row').innerHTML=cartoona;
}


getDataOfName('');
