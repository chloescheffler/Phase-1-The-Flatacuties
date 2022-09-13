const recipeImage = document.getElementById("detail-image");
const recipeName = document.getElementById("directions-header");
const recipeInstructions = document.getElementById("directions");
const recipeIngredients = document.getElementById("ingredients");
const recipeBanner = document.querySelector('#recipe-banner')
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
            if (ingredientName != ""){
                li.textContent = ingredientEntry
                recipeIngredients.append(li)
            }  
        }
        recipeImage.src = mealImage;
        recipeName.textContent = `Here's an idea: ${mealName}`;
        recipeInstructions.textContent = instructions;
    })
}

loadRandom();

fetch('https://www.themealdb.com/api/json/v2/9973533/latest.php')
.then(res => res.json())
.then(data => data.meals.forEach((meal) => {
    renderRecipeBar(meal)
    console.log(data)
}))

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
        if (ingredientName != ""){
            li.textContent = ingredientEntry
            recipeIngredients.append(li)
        }   
    }
}

function renderRecipeBar(meal) {
    const img = document.createElement('img')
    img.src = meal.strMealThumb
    recipeBanner.append(img)

    img.addEventListener('click', (e) => {
        // loads clicked meal into the spotlight
        loadRecipe(meal)
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


function handleForm() {
    const form = document.querySelector('#ingredient-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const firstIng = textify(e.target["first"].value)
        const secondIng = textify(e.target["second"].value)

        clearBar();

        fetch(`https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${firstIng},${secondIng}`)
            .then(res => res.json())
            .then(data => data.meals.forEach((meal) => {
                renderRecipeBar(meal)
                loadRecipe(meal)
            } 
        ))
        

    })
}


handleForm()