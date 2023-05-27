(async function(){

    const response = await fetch("./recipes.json");
    const recipes = await response.json();
    //console.log(recipes);
    const searchElem = document.getElementById("searchInput");
    const btnElem = document.getElementById("searchBtn");
    const listElem = document.getElementById("recipe-list");
    const recipeElem = document.getElementById("recipeDetailsContainer");

    //function for showing the recipe detail
    function displayRecipeDetail (recipe){
        // console.log(recipe);
        recipeElem.innerHTML = "";
        recipeElem.innerHTML = `
        <h1 class="recipe-title">${recipe.title}</h1>
        <h3>Ingredients</h3>
        <ul>${recipe.ingredients.map(function(ingredient){
            return "<li>"+ingredient+"</li>";
        }).join("")}</ul>
        <h3>Instructions</h3>
        <div>${recipe.instructions}</div>
        `;
    }
    //Function for showing the results
    function displaySearchResults (result) {
        listElem.innerHTML = "";
        result.forEach( function(recipe) {
        const li = document.createElement("li");
        const listItem = `
                <div class="title">${recipe.title}</div>
                <div class="description">${recipe.description}</div>
        `;
        li.innerHTML = recipe.title;
        li.addEventListener("click", function(){
            displayRecipeDetail(recipe);
        })
        listElem.appendChild(li);
        });
    }
    //Function for searching recipes
    function search(){
        const query = searchElem.value.toLowerCase();
        const result = recipes.filter( function(recipes){
            return (recipes.title.toLowerCase().includes(query) ||
            recipes.ingredients.join(" ").toLowerCase().includes(query))
        });
        displaySearchResults(result);
    }
    btnElem.addEventListener("click", search);

})();