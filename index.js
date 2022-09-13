const recipeImage = document.getElementById("detail-image");
const recipeName = document.getElementById("directions-header");
const recipeInstructions = document.getElementById("directions");
const recipeIngredients = document.getElementById("ingredients");

// load random recipe at first
function loadRandom(){
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(recipe => {
        const mealName = recipe.meals[0].strMeal;
        const mealImage = recipe.meals[0].strMealThumb;
        const instructions = recipe.meals[0].strInstructions;
        //there are no more than 20 ingredients in each recipe
        for (let i = 0; i < 20; i++){
            let ingredientName = recipe.meals[0][`strIngredient${i+1}`]
            let ingredientMeasure = recipe.meals[0][`strMeasure${i+1}`]
            let ingredientEntry = ingredientMeasure + ' ' + ingredientName
            const li = document.createElement("li")
            if (ingredientEntry != "" && ingredientEntry != " "){
                li.textContent = ingredientEntry
                console.log(ingredientEntry)
                recipeIngredients.append(li)
            }   
        }
        recipeImage.src = mealImage;
        recipeName.textContent = `Here's an idea: ${mealName}`;
        console.log(instructions)
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

function renderRecipeBar(meal) {
    const recipeBanner = document.querySelector('#recipe-banner')
    const img = document.createElement('img')
    img.src = meal.strMealThumb
    recipeBanner.append(img)

    img.addEventListener('click', (e) => {
        recipeImage.src = meal.strMealThumb
        recipeInstructions.textContent = meal.strInstructions
        recipeName.textContent = meal.strMeal
        recipeIngredients.innerHTML = ""
        for (let i = 0; i < 20; i++){
            let ingredientName = meal[`strIngredient${i+1}`]
            let ingredientMeasure = meal[`strMeasure${i+1}`]
            let ingredientEntry = ingredientMeasure + ' ' + ingredientName
            const li = document.createElement("li")
            console.log(ingredientEntry)
            if (ingredientEntry != "" && ingredientEntry != " "){
                li.textContent = ingredientEntry
                console.log(ingredientEntry)
                recipeIngredients.append(li)
            }   
        }
    })
}


function handleForm() {
    const form = document.querySelector('#ingredient-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const firstIng = e.target["first"].value
        const secondIng = e.target["second"].value
        const thirdIng = e.target["third"].value

        // const newRecipe = 
    })
}