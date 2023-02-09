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
        $(listOfLi[cont]).css('top',numTop+'%')
        cont++;
        numTop+=13;
        if(cont>5) 
            clearInterval(intervalName)
    }
    intervalName = setInterval(showMenu,100);
}



async function getDataOfIngredients(){
    let response = await fetch ('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    let {meals} = await response.json();
    await DisplayDataOfIngredients(meals);
    setAndGetnameOfIngredients();
}

function DisplayDataOfIngredients(meals) {
    let cartoona="";
    meals.map((item)=>{
        if(item.strDescription!==null)
        cartoona+=`
        <div class="item col-md-6 col-lg-4 col-xl-3">
                <div nameOfIngredients = ${item.strIngredient} class="box boxInArea text-center p-3 rounded-3 ">
                <i class=" food fa-4x fa-solid fa-bowl-food mb-3"></i>
                <h3 class="text-white">${item.strIngredient}</h3>
                <p class="colorDsc">${item.strDescription.split(' ').splice(0,15).join(' ')}</p>
                </div>
            </div>
        `
    })
    document.querySelector('.row').innerHTML=cartoona;
}

function setAndGetnameOfIngredients() {
    let x=$('.item .box').click(function () {
        let nameOfIngredients=$(this).attr("nameOfIngredients");
            localStorage.setItem('nameOfIngredients',nameOfIngredients);
            open('RelatedToTheIngredients.html' ,'_self');
            
    })
}

getDataOfIngredients();