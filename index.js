const recipeImage = document.getElementById("detail-image");
const recipeName = document.getElementById("directions-header");
const recipeInstructions = document.getElementById("directions");
const recipeIngredients = document.getElementById("ingredients");

// load random recipe at first
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(data => data.forEach((meal) => {
        loadRandom(meal)
    }))
       
    function loadRandom() {
        const mealName = recipe.meals[0].strMeal;
        const mealImage = recipe.meals[0].strMealThumb;
        const instructions = recipe.meals[0].strInstructions;
        const recipeBanner = document.querySelector('#recipe-banner')
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
        recipeInstructions.textContent = instructions;
    // })
    // .then(recipe => recipe.forEach((mealImage) => {
    //     recipeBanner.append(mealImage)
    }

function handleForm() {
    const form = document.querySelector('#ingredient-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const firstIng = e.target["first"].value
        const secondIng = e.target["second"].value
        const thirdIng = e.target["third"].value

        const newRecipe = {

        }
    })
}