$(document).ready(function () {
    $('.loading').fadeOut(1000);
    $('body').removeClass('overflow-hidden ');
})

let idMeal= localStorage.getItem('idMeal');
async  function getDataOfItem() {
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    let{meals} = await response.json();
    DisplayDataOfItem (meals);
}

function DisplayDataOfItem (meals) {
    let convirs=new Map(Object.entries(meals[0]));
    let ingredients=[];
    let ingredient1=[];
    let ingredient2=[];
    let ingredient3=[];
    for (const x of convirs) {    
        ingredients.push(x[1]);
    }
    
    
    
    for (let i = 9; i < ingredients.length  ; i++) {
        if (ingredients[i]) {
            ingredient1.push(`${ingredients[i] }`);
        }
        else {
            i=ingredients.length;
            
        }
    }
    
    for (let i = 29; i < 29+ingredient1.length ; i++) {
        if (ingredients[i]) {
            ingredient2.push(`${ingredients[i]}`);
        }
        else {
            i=ingredients.length ;
        }
    }
    
    for (let i = 0; i < ingredient1.length ; i++) {
        
        ingredient3.push(`<span class=" Ingredient-card p-2 m-1 rounded-3 text-black d-inline-block"> ${ingredient2[i]} ${ingredient1[i]}</span>`);
        
    }
    console.log(ingredient3);
    let cartoona='';
    meals.map((item)=>{
        cartoona+=`
        <div class="item  col-md-5">
                <div idMeal= ${item.idMeal}>
                    <img  class="w-100" src="${item.strMealThumb}" alt="">
                    <h1 class="fs-3 h2 text-white text-center mt-3 fw-normal" >${item.strMeal}</h1>
                </div>
            </div>
            <div class="instructions col-md-7 text-white">
                <h2 class=" h1 fw-light">Instructions</h2>
                <p>${item.strInstructions}</p>
                <div class="areaAndCategory">
                    <h6 class="d-inline-block mb-3">Area: </h6><span class="">  ${item.strArea}</span><br>
                    <h6 class="d-inline-block">Category: </h6><span class="">  ${item.strCategory}</span>
                    <div class="my-3">
                    ${ingredient3.join(' ')}
                    </div>
                </div>
                <div class="tags"></div>
                    <h3 class="h2 mb-3 fw-light">Tags</h3>
                    <button class="btn btn-outline-danger youtube-btn"><a class=" text-danger text-decoration-none" href="${item.strYoutube}">Youtub</a> </button>

                </div>
                
            </div>>
        `
    })
    document.querySelector('.row').innerHTML= cartoona;
}
getDataOfItem();
