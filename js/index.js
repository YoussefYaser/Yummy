//start vars
const cat = document.querySelector('.page .categories');
const catRow = document.querySelector('.page .categories .container > .row');
const details = document.querySelector('.page .details');
const detailsRow = document.querySelector('.page .details .container > .row');
const meal = document.querySelector('.page .meals');
const mealRow = document.querySelector('.page .meals .container > .row');
const area = document.querySelector('.page .area');
const areaRow = document.querySelector('.page .area .container > .row');
const ingredients = document.querySelector('.page .ingredients');
const ingredientsRow = document.querySelector('.page .ingredients .container > .row');
const backBtn = document.querySelectorAll('.page  .back');
const asideUl = document.querySelector('aside ul');

//--------------------------------------------------------------------------------------------------------

(
    async function(){
        $('.page .meals .back').addClass('d-none');
        const data =  (await searchMeal('')).meals;
        
        let box = ''
        for(let i=0; i<data.length; i++){
            box += `<div class="col-xl-3 col-lg-4 col-md-6">
                                <div class="inner position-relative overflow-hidden rounded" onclick=showMealDetails('${data[i]['idMeal']}')>
                                    <img src="${data[i]['strMealThumb']}" class="w-100" alt="">
                                    <div class="description position-absolute start-0 w-100 h-100 
                                                bg-opacity-75 text-black text-center text-capitalize bg-white p-3 xy-center">
                                        <h2>${data[i]['strMeal']}</h2>
                                    </div>
                                </div>
                            </div>`
        }

        mealRow.innerHTML = box;
        $('.page .meals .inner').fadeIn(700);
    }
)();


// start fetch meal

async function getMeals(cat){

    meal.classList.replace('d-none', 'd-block');

    try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
        if(response.ok){
            return response.json();
        }
        else{
            console.log('bad request');
        }
    }
    catch(error){
        throw new Error(error);
    }
}

//--------------------------------------------------------------------------------------------------------------

//start show meals


async function showMeals(cat){
    
    document.body.classList.add('overflow-hidden');
    const  data = (await getMeals(cat)).meals;

    mealRow.innerHTML = `<div class="animation bg-black position-fixed top-0 start-0 m-0 w-100 h-100 xy-center">
                            <span class="text-white">
                                <i class="fa-solid fa-spinner fa-spin"></i>
                            </span>
                        </div>`;

    let box = '';

    for(let i=0; i<data.length; i++){
        box += `<div class="col-xl-3 col-lg-4 col-md-6">
                                <div class="inner position-relative overflow-hidden rounded" onclick=showMealDetails('${data[i]['idMeal']}')>
                                    <img src="${data[i]['strMealThumb']}" class="w-100" alt="">
                                    <div class="description position-absolute start-0 w-100 h-100 
                                                bg-opacity-75 text-black text-center text-capitalize bg-white p-3 xy-center">
                                        <h2>${data[i]['strMeal']}</h2>
                                    </div>
                                </div>
                            </div>`;
    }

    setTimeout(()=>{
        mealRow.innerHTML = box;
        $('.page .meals .inner').fadeIn(700);
    }, 100);
}

//---------------------------------------------------------------------------------------------------------------

// fetch meal details

async function getMealDetails(id){

    try{
        const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if(response.ok){
            return response.json();
        }
        else{
            console.log('bad request');
        }
    }
    catch(error){
        throw new Error(error);
    }
}

//--------------------------------------------------------------------------------------------------------------------

//show meal details

async function showMealDetails(id){
    details.classList.replace('d-none', 'd-block');
    const data = (await getMealDetails(id)).meals;

    let box= '';

    box = `<div class="col-lg-5">
                        <img src="${data[0]['strMealThumb']}" class="w-100 rounded mb-3" alt="">
                        <h3 class="text-center text-capitalize text-white">${data[0]['strMeal']}</h3>
                    </div>
                    <div class="col-lg-7">
                        <h3 class="text-white">instruction</h3>
                        <p class="text-white">
                            ${data[0]['strInstructions']}
                        </p>
                        <ul class="list-unstyled text-capitalize">
                            <li class="d-flex align-items-center text-white">
                                <span class="" style="width: 70px;">area</span>
                                : ${data[0]['strArea']}
                            </li>
                            <li class="d-flex align-items-center text-white">
                                <span class="" style="width: 70px;">category</span>
                                : ${data[0]['strCategory']}
                            </li>
                            <li class="d-flex align-items-center text-white">
                                <span class="" style="width: 70px;">recipes</span>
                                :
                            </li>
                            <div class="Measure d-flex flex-wrap mt-2">`;
    for(let i=0; i<20; i++){
        if(data[0][`strIngredient${i}`] == '')
            break;
        box+= `<div class="bg-info rounded p-2 me-3 mb-3 ">${data[0][`strMeasure${i}`]} ${data[0][`strIngredient${i}`]}</div>`
    }

    let tag = data[0][`strTags`];
    if( tag != null){
        tag = tag.split(',');
    }
    
    box+=`</div>
                <li class="text-white">
                    <span class="" style="width: 70px;">
                    ${(tag == null)? '' : 'tags'}
                    </span>
                    ${(tag == null)? '' : ':'}
                </li>
                <div class="Measure d-flex flex-wrap mt-2">`;

    if(tag == null)
        box += '';
    else{
        for(let i=0; i<tag.length; i++){
            box +=`<div class="bg-info rounded p-2 me-3 mb-3 ">${tag[i]}</div>`
        }
    }

    box +=`</div>
                </ul>
                <button class="btn btn-warning text-capitalize me-2">
                    <a href="${data[0]['strSource']}" class="no-decoration text-white" target="_blank"> 
                    source
                    </a>
                </button>
                <button class="btn btn-danger text-capitalize">
                    <a href="${data[0]['strYoutube']}" class="no-decoration text-white" target="_blank">
                    youTube
                    </a>
                </button>
            </div>`;
                    
    detailsRow.innerHTML = box;
    $(detailsRow).animate({
        'top' : '0px',
        'opacity' : '1'
    }, 1000);
}                       

//---------------------------------------------------------------------------------------------------------------

// start back button

backBtn.forEach((elem, i)=>{
    elem.addEventListener('click', function(){
        this.parentElement.parentElement.classList.replace('d-block', 'd-none');
        if(this.parentElement.parentElement == details){
            this.nextElementSibling.removeAttribute('style');
            this.nextElementSibling.innerHTML = '';
        }
        else if(this.parentElement.parentElement == meal){
            document.body.classList.remove('overflow-hidden');
            this.nextElementSibling.innerHTML = `<div class="animation bg-black position-fixed top-0 start-0 m-0 w-100 h-100 xy-center">
                                    <span class="text-white">
                                        <i class="fa-solid fa-spinner fa-spin"></i>
                                    </span>
                                </div>`;
            showCategories();
        }
    });

})

//---------------------------------------------------------------------------------------------------------------

// start fetch all meal categories

async function getCategories(){
    try{
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        if(response.ok){
            return response.json();
        }
        else{
            console.log('bad request');
        }
    }
    catch(error){
        throw new Error(error);
    }
}


//---------------------------------------------------------------------------------------------------------------

// start show categories

async function showCategories(){
    catRow.innerHTML = `<div class="animation bg-black position-fixed top-0 start-0 m-0 w-100 h-100 xy-center">
                            <span class="text-white">
                                <i class="fa-solid fa-spinner fa-spin"></i>
                            </span>
                        </div>`;

    const data = (await getCategories()).categories;

    let box = '';

    for(let i=0; i<data.length; i++){
        box += `<div class="col-xl-3 col-lg-4 col-md-6">
                                <div class="inner position-relative overflow-hidden rounded" onclick=showMeals('${data[i].strCategory}')>
                                    <img src="${data[i]['strCategoryThumb']}" class="w-100" alt="">
                                    <div class="description position-absolute  start-0 w-100 h-100 
                                                bg-opacity-75 text-black text-center text-capitalize bg-white p-3">
                                        <h2>${data[i]['strCategory']}</h2>
                                        <p>
                                            ${data[i]['strCategoryDescription'].split(' ').slice(0, 20).join(' ')}
                                        </p>
                                    </div>
                                </div>
                            </div>`;
    }

    setTimeout(()=>{
        catRow.innerHTML = box;
        $('.page .categories .inner').fadeIn(700);
    }, 100);
}

showCategories();

//---------------------------------------------------------------------------------------------------------------

// fetch areas

async function getAllareas(){
    try{
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        if(response.ok){
            return response.json();
        }
        else{
            console.log('bad request');
        }
    }
    catch(error){
        throw new Error(error);
    }
}

//-------------------------------------------------------------------------------------------------------------------------

//show areas

async function showAllareas(){

    const data = (await getAllareas()).meals;

    let box='';

    for(let i=0; i<data.length; i++){
        box += `<div class="col-xl-3 col-lg-4 col-md-6">
                    <div class="inner text-center" onclick = showMealsByarea('${data[i]['strArea']}')>
                        <span class="d-block mx-auto fs-1">
                            <i class="fa-solid fa-house-laptop"></i>
                        </span>
                        <h3 class="fw-bold">${data[i]['strArea']}</h3>
                    </div>
                </div>`;
    }

    areaRow.innerHTML = box;
}

showAllareas();

//---------------------------------------------------------------------------------------------------------------------------

//  fetch meals with areas

async function getMealsByarea(area){
    try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        if(response.ok){
            return response.json();
        }
        else{
            console.log('bad request');
        }
    }
    catch(error){
        throw new Error(error);
    }
}

//--------------------------------------------------------------------------------------------------------------------------

//show  meals by area

async function showMealsByarea(a){
    document.body.classList.add('overflow-hidden');
    const  data = (await getMealsByarea(a)).meals;

    cat.classList.replace('d-block', 'd-none');
    meal.classList.replace('d-none', 'd-block');

    mealRow.innerHTML = `<div class="animation bg-black position-fixed top-0 start-0 m-0 w-100 h-100 xy-center">
                            <span class="text-white">
                                <i class="fa-solid fa-spinner fa-spin"></i>
                            </span>
                        </div>`;

    let box = '';

    for(let i=0; i<data.length; i++){
        box += `<div class="col-xl-3 col-lg-4 col-md-6">
                                <div class="inner position-relative overflow-hidden rounded" onclick=showMealDetails('${data[i]['idMeal']}')>
                                    <img src="${data[i]['strMealThumb']}" class="w-100" alt="">
                                    <div class="description position-absolute start-0 w-100 h-100 
                                                bg-opacity-75 text-black text-center text-capitalize bg-white p-3 xy-center">
                                        <h2>${data[i]['strMeal']}</h2>
                                    </div>
                                </div>
                            </div>`;
    }

    
    setTimeout(()=>{
        mealRow.innerHTML = box;
        $('.page .meals .inner').fadeIn(700);
    }, 100);
}

//-------------------------------------------------------------------------------------------------------------------------

// fetch ingredients

async function getAllingredients(){
    try{
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        if(response.ok){
            return response.json();
        }
        else{
            console.log('bad request');
        }
    }
    catch(error){
        throw new Error(error);
    }
}

//---------------------------------------------------------------------------------------------------------------------------------

// show ingredients

async function showAllingredients(){

    const data = (await getAllingredients()).meals;

    let box='';

    for(let i=0; i<20; i++){
        
        box += `<div class="col-xl-3 col-lg-4 col-md-6">
                    <div class="inner text-center">
                        <span class="d-block mx-auto fs-1">
                            <i class="fa-solid fa-drumstick-bite"></i>
                        </span>
                        <h3 class="fw-bold">${data[i]['strIngredient']}</h3>
                        <p>
                            ${data[i]['strDescription'].split(' ').slice(0, 20).join(' ')}
                        </p>
                    </div>
                </div>`;
    }

    ingredientsRow.innerHTML = box;

    document.querySelectorAll('.page .ingredients .row .inner').forEach((elem, i)=>{
        elem.addEventListener('click', function(){
            console.log('m');
            showMealsByIngredients(data[i]['strIngredient'])
        });
    });
    
}

showAllingredients();

//-------------------------------------------------------------------------------------------------------------------------

// get meals by ingredients

async function getMealsByIngredients(ing){
    try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`);
        if(response.ok){
            return response.json();
        }
        else{
            console.log('bad request');
        }
    }
    catch(error){
        throw new Error(error);
    }
}

//--------------------------------------------------------------------------------------------------------------------------

// show meals by ingredients

async function showMealsByIngredients(ing){
    document.body.classList.add('overflow-hidden');
    const  data = (await getMealsByIngredients(ing)).meals;

    cat.classList.replace('d-block', 'd-none');
    meal.classList.replace('d-none', 'd-block');


    mealRow.innerHTML = `<div class="animation bg-black position-fixed top-0 start-0 m-0 w-100 h-100 xy-center">
                            <span class="text-white">
                                <i class="fa-solid fa-spinner fa-spin"></i>
                            </span>
                        </div>`;

    let box = '';

    for(let i=0; i<data.length; i++){
        box += `<div class="col-xl-3 col-lg-4 col-md-6">
                                <div class="inner position-relative overflow-hidden rounded" onclick=showMealDetails('${data[i]['idMeal']}')>
                                    <img src="${data[i]['strMealThumb']}" class="w-100" alt="">
                                    <div class="description position-absolute start-0 w-100 h-100 
                                                bg-opacity-75 text-black text-center text-capitalize bg-white p-3 xy-center">
                                        <h2>${data[i]['strMeal']}</h2>
                                    </div>
                                </div>
                            </div>`;
    }

    
    setTimeout(()=>{
        mealRow.innerHTML = box;
        $('.page .meals .inner').fadeIn(700);
    }, 100);
}

//---------------------------------------------------------------------------------------------------------------------------

// fetch search

async function searchMeal(name, letter=false){
    if(!letter){
        try{
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
            if(response.ok){
                return response.json();
            }
            else{
                console.log('bad request');
            }
        }
        catch(error){
            throw new Error(error);
        }
    }
    else{
        try{
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`);
            if(response.ok){
                return response.json();
            }
            else{
                console.log('bad request');
            }
        }
        catch(error){
            throw new Error(error);
        }
    }
}

//----------------------------------------------------------------------------------------------------------------

// input search event

$('.page .meals .search input').on('input', async function(){
    if(this.value.length > 0){
        if(this.classList.contains('by-name')){
            showSearchData( (await searchMeal(this.value)).meals );
        }
        else if(this.classList.contains('by-letter')){
            showSearchData( (await searchMeal(this.value, true)).meals );
        }
    }
    else{
        mealRow.innerHTML = '';
    }
})

//--------------------------------------------------------------------------------------------------------------------

//show search data

async function showSearchData(data){
    if(data != null){
        mealRow.innerHTML = `<div class="animation bg-black position-fixed top-0 start-0 m-0 w-100 h-100 xy-center">
                            <span class="text-white">
                                <i class="fa-solid fa-spinner fa-spin"></i>
                            </span>
                        </div>`;
        let box = '';
    
        for(let i=0; i<data.length; i++){
            box += `<div class="col-xl-3 col-lg-4 col-md-6">
                                    <div class="inner position-relative overflow-hidden rounded" onclick=showMealDetails('${data[i]['idMeal']}')>
                                        <img src="${data[i]['strMealThumb']}" class="w-100" alt="">
                                        <div class="description position-absolute start-0 w-100 h-100 
                                                    bg-opacity-75 text-black text-center text-capitalize bg-white p-3 xy-center">
                                            <h2>${data[i]['strMeal']}</h2>
                                        </div>
                                    </div>
                                </div>`;
        }
    
        setTimeout(()=>{
            mealRow.innerHTML = box;
            $('.page .meals .inner').fadeIn(700);
        }, 100);
    }
    else{
        
        mealRow .innerHTML = '<p class="text-white">No found meal</p>';
    }

}

//---------------------------------------------------------------------------------------------------------------

// show & hide aside 

const aside = document.querySelector('aside');
let humburgerBar = document.getElementById('humburger-bar');
let humburgerToggler = document.getElementById('humburger-toggler');

$('#aside-bar').on('click', function(){
    $('.page aside > div:nth-child(1)').animate({
        'width' : 'toggle'
    }, 500);

    if(aside.children[0].classList.contains('collapsed')){
        aside.children[0].classList.remove('collapsed');
        this.children[0].classList.remove('collapsed');
        humburgerBar.children[0].style.setProperty('animation-name', 'bar-top-forward');
        humburgerBar.children[2].style.setProperty('animation-name','bar-bottom-forward');
    }
    else{
        aside.children[0].classList.add('collapsed');
        this.children[0].classList.add('collapsed');
        humburgerBar.children[0].style.setProperty('animation-name', 'bar-top-backward');
        humburgerBar.children[2].style.setProperty('animation-name','bar-bottom-backward');
    }


    if(asideUl.classList.contains('close')){
        for(let i=0; i<5; i++){
            setTimeout(()=>{
                $('aside ul li').eq(i).animate({
                    'top': '0'
                }, 400)
            }, i*100);
        }

        $('aside ul').removeClass('close');
    }
    else{
        $('aside ul li').animate({
            'top' : '200px'
        }, 400);
        
        $('aside ul').addClass('close');
    }
});

document.addEventListener('click', function(event){
    if(event.target != aside  &&  !aside.contains(event.target) && !aside.children[0].classList.contains('collapsed'))
        document.querySelector('#aside-bar').click();

});


//--------------------------------------------------------------------------------------------------------------------

// select from aside

Array.from(asideUl.children).forEach((elem, i)=>{
    elem.addEventListener('click', function(){
        if(i == 0){
            cat.classList.replace('d-block', 'd-none');
            details.classList.replace('d-block', 'd-none');
            area.classList.replace('d-block', 'd-none');
            meal.classList.replace('d-none', 'd-block');
            ingredients.classList.replace('d-block', 'd-none');
            mealRow .innerHTML='';
            $('.page .meals .back').addClass('d-none');
            $('.page .meals .search').removeClass('d-none');
            $('.page .meals .search').addClass('d-block');
            $('.page .meals .contact-us').removeClass('d-flex');
            $('.page .meals .contact-us').addClass('d-none');
            $('.page .meals .search input').val('');
        }
        else if(i == 1){
            showCategories();
            cat.classList.replace('d-none', 'd-block');
            details.classList.replace('d-block', 'd-none');
            area.classList.replace('d-block', 'd-none');
            meal.classList.replace('d-block', 'd-none');
            ingredients.classList.replace('d-block', 'd-none');
            backBtn.forEach((elem, i)=>{
                elem.classList.replace('d-none', 'd-flex');
            })
            $('.page .meals .search').removeClass('d-block');
            $('.page .meals .search').addClass('d-none');
            $('.page .meals .contact-us').removeClass('d-flex');
            $('.page .meals .contact-us').addClass('d-none');
        }
        else if(i == 2){
            cat.classList.replace('d-block', 'd-none');
            details.classList.replace('d-block', 'd-none');
            area.classList.replace('d-none', 'd-block');
            meal.classList.replace('d-block', 'd-none');
            ingredients.classList.replace('d-block', 'd-none');
            backBtn.forEach((elem, i)=>{
                elem.classList.replace('d-none', 'd-flex');
            })
            $('.page .meals .search').removeClass('d-block');
            $('.page .meals .search').addClass('d-none');
            $('.page .meals .contact-us').removeClass('d-flex');
            $('.page .meals .contact-us').addClass('d-none');
        }
        else if(i == 3){
            cat.classList.replace('d-block', 'd-none');
            details.classList.replace('d-block', 'd-none');
            area.classList.replace('d-block', 'd-none');
            meal.classList.replace('d-block', 'd-none');
            ingredients.classList.replace('d-none', 'd-block');
            backBtn.forEach((elem, i)=>{
                elem.classList.replace('d-none', 'd-flex');
            })
            $('.page .meals .search').removeClass('d-block');
            $('.page .meals .search').addClass('d-none');
            $('.page .meals .contact-us').removeClass('d-flex');
            $('.page .meals .contact-us').addClass('d-none');
        }
        else if(i == 4){
            cat.classList.replace('d-block', 'd-none');
            details.classList.replace('d-block', 'd-none');
            area.classList.replace('d-block', 'd-none');
            meal.classList.replace('d-none', 'd-block');
            ingredients.classList.replace('d-block', 'd-none');
            mealRow .innerHTML='';
            backBtn.forEach((elem, i)=>{
                elem.classList.replace('d-flex', 'd-none');
            })
            $('.page .meals .search').removeClass('d-block');
            $('.page .meals .search').addClass('d-none');
            $('.page .meals .contact-us').removeClass('d-none');
            $('.page .meals .contact-us').addClass('d-flex');
            
        }
    });
})

//------------------------------------------------------------------------------------------------------------------

//contact us validation

function validation(input){
    const regex = {
        name : /^[A-Za-z\s]{1,30}$/, 
        email : /^\w+@\w+\.com$/, 
        phone : /^\+?[\d-]+$/, 
        age : /^(([2-9][0-9]|1[2-9]))$/,
        password : /^(?=.*\d.*\d.*\d)[A-Z][A-Za-z\d]{7,}$/
    }

    if(regex[input.id].test(input.value)){
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
    }
    else{
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    }
}

$('.page .contact-us input').not('.page .contact-us input#repassword').on('input', function(){
    validation(this);
    const inputs = document.querySelectorAll('.page .contact-us input');
    let k = 0;
    inputs.forEach((elem, i)=>{
        if(elem.classList.contains('is-valid')){
            k ++;
        }
    });

    if(k == 6){
        document.querySelector('.page .contact-us #submit').removeAttribute('disabled');
    }
});

$('.page .contact-us input#repassword').on('input', function(){
    const pass = document.querySelector('.page .contact-us input#password');
    if(pass.classList.contains('is-valid') && this.value === pass.value){
        this.classList.add('is-valid');
        this.classList.remove('is-invalid');
    }
    else{
        this.classList.add('is-invalid')
        this.classList.remove('is-valid')
    }
    const inputs = document.querySelectorAll('.page .contact-us input');
    let k = 0;
    inputs.forEach((elem, i)=>{
        if(elem.classList.contains('is-valid')){
            k ++;
        }
    });

    if(k == 6){
        document.querySelector('.page .contact-us #submit').removeAttribute('disabled');
    }
})


//--------------------------------------------------------------------------------------------------------------