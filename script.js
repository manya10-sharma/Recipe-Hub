function searchRecipes(){
    const input = document.querySelector(".search").value;
    const recipeDiv = document.querySelector(".recipes");
    const notfound = document.querySelector(".notfound");

    recipeDiv.innerHTML = "";
    notfound.style.display = "none";

    if(input.trim() === ""){
        notfound.innerHTML="Please enter a recipe name to search!";
        notfound.style.display = 'block';
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`).then(response=>response.json()).then(data=>{
        if(!data.meals){
            notfound.innerHTML="Recipe not found, please try another search!";
            notfound.style.display = 'block';
        }
        else{
            data.meals.forEach(meal=> {
                const card = document.createElement('div');
                card.classList.add("recipes-card");

                card.innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                                  <h3>${meal.strMeal}</h3>
                                  <button onclick="viewRecipe('${meal.idMeal}')">View Recipe</button> `;
                recipeDiv.appendChild(card);
            });

             document.getElementById("recipes").scrollIntoView({
                    behavior: "smooth"
                });
        }
    })
}
const popUpCard = document.querySelector(".pop-up-card");
function viewRecipe(mealID){
    const recipe_details = document.querySelector(".recipe-details");
    const recipe_title = document.querySelector(".recipe-title");
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`).then(response => response.json()).then(data => {
        const meal = data.meals[0];
        recipe_title.innerText = meal.strMeal;
        recipe_details.innerText = meal.strInstructions;
        popUpCard.style.display = "block";
    })
}

function closeRecipe(){
    popUpCard.style.display='none';
}