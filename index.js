const recipeImage = document.getElementById("detail-image");
const recipeName = document.getElementById("directions-header");
const recipeInstructions = document.getElementById("directions");
const recipeIngredients = document.getElementById("ingredients");
const recipeBanner = document.querySelector('#recipe-banner')
const ingredientsHeader = document.querySelector('#ingredients-header')
const API_KEY = 9973533

// load random recipe at first
function loadRandom(){
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(recipe => {
        const mealName = recipe.meals[0].strMeal;
        const mealImage = recipe.meals[0].strMealThumb;
        const instructions = recipe.meals[0].strInstructions;
        //there are no more than 20 ingredients in each recipe
        for (let i = 1; i < 21; i++){
            let ingredientName = recipe.meals[0][`strIngredient${i}`]
            let ingredientMeasure = recipe.meals[0][`strMeasure${i}`]
            let ingredientEntry = ingredientMeasure + ' ' + ingredientName
            const li = document.createElement("li")
            if (ingredientName != "" && ingredientName != null){
                li.textContent = ingredientEntry
                recipeIngredients.append(li)
            }  
        }
        recipeImage.src = mealImage;
        recipeName.textContent = `Here's an idea: ${mealName}`;
        recipeInstructions.textContent = instructions;
        renderRecipeBar(recipe.meals[0])
    })
}

function loadBanner(){
    recipeIngredients.innerHTML = ""
    fetch('https://www.themealdb.com/api/json/v2/9973533/latest.php')
    .then(res => res.json())
    .then(data => data.meals.forEach((meal) => {
        renderRecipeBar(meal)
    }))
}

// loads image, instructions, and ingredients for a given meal into the spotlight
function loadRecipe(meal){
    recipeImage.src = meal.strMealThumb
    recipeInstructions.textContent = meal.strInstructions
    recipeName.textContent = meal.strMeal
    recipeIngredients.innerHTML = ""
    for (let i = 1; i < 21; i++){
        let ingredientName = meal[`strIngredient${i}`]
        let ingredientMeasure = meal[`strMeasure${i}`]
        let ingredientEntry = ingredientMeasure + ' ' + ingredientName
        const li = document.createElement("li")
        if (ingredientName != "" && ingredientName != null){
            li.textContent = ingredientEntry
            recipeIngredients.append(li)
        }   
    }
    ingredientsHeader.textContent = "Ingredients"
}

function renderRecipeBar(meal) {
    const img = document.createElement('img')
    img.src = meal.strMealThumb
    recipeBanner.append(img)
    img.addEventListener('click', (e) => {
        // loads clicked meal into the spotlight
        getMealById(meal.idMeal)
        .then(meal => loadRecipe(meal))
    })
}

function textify(string){
    let newString = "";
    for (letter in string){
        if (string[letter] == " "){
            newString = newString + "_"
        } 
        else{
            newString = newString + string[letter].toLowerCase()
        }
    }
    return newString
}


function clearBar(){
    recipeBanner.innerHTML = ""
}

function getMealById(id){
    return fetch(`https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {
        return data.meals[0]
    })
}

function handleForm() {
    const form = document.querySelector('#ingredient-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const firstIng = textify(e.target["first"].value)
        const secondIng = textify(e.target["second"].value)

        clearBar();

        //if no ingredients
        if (firstIng == "" && secondIng == ""){
            loadBanner()
            loadRandom()
        }

        //only one ingredient
        else if (secondIng == ""){
            fetch(`https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${firstIng}`)
            .then(res => res.json())
            .then(data => {
                //make sure meals are found
                if (data.meals == null){
                    nothingFoundOne(firstIng)
                }
                else{
                    data.meals.forEach((meal) => {
                        renderRecipeBar(meal)
                        getMealById(meal.idMeal)
                        .then(meal => loadRecipe(meal))
                    })
                }
            }
            )
        }
     
        //two ingredients
        else{
            fetch(`https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${firstIng},${secondIng}`)
                .then(res => res.json())
                .then(data => {
                    //make sure meals are found
                    if (data.meals == null){
                        nothingFoundTwo(firstIng, secondIng)
                    }
                    else{
                        data.meals.forEach((meal) => {
                            renderRecipeBar(meal)
                            getMealById(meal.idMeal)
                            .then(meal => loadRecipe(meal))
                        })
                    }
                })
        }
    })
}

function nothingFoundOne(firstIng){
    // recipeImage
    recipeName.textContent = `No recipes found with ${firstIng}. Sorry.`
    recipeInstructions.textContent = "We're not MADE of recipes over here. Look for something else in your pantry and/or fridge!"
    recipeIngredients.innerHTML = ""
    ingredientsHeader.textContent = ""
}

function nothingFoundTwo(firstIng, secondIng){
    // recipeImage
    recipeName.textContent = `No recipes found with ${firstIng} and ${secondIng}. Sorry.`
    recipeInstructions.textContent = "We're not MADE of recipes over here. Look for something else in your pantry and/or fridge!"
    recipeIngredients.innerHTML = ""
    ingredientsHeader.textContent = ""
}


loadRandom()
loadBanner()
handleForm()