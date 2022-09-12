const recipeImage = document.getElementById("detail-image")
const recipeCaption = document.getElementById("detail-caption");

// load random recipe at first
function loadRandom(){
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(recipe => {
        const mealName = recipe.meals[0].strMeal;
        const mealImage = recipe.meals[0].strMealThumb;
        recipeImage.src = mealImage;
        recipeCaption.textContent = mealName;
    })
}

loadRandom();