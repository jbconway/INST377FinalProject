// adding supabase data on html front end
async function createRecipe() {
    await fetch('/recipes', {
        method: 'POST',
        body: JSON.stringify({
            recipeName: `${document.getElementById('recipeName').value}`,
            recipeIngredients: `${document.getElementById('recipeIngredients').value}`
        }),
    }).then((result) => result.json());

    await loadRecipeData();
}

// getting supabase data on html front end
async function loadRecipeData() {
    await fetch(`/recipes`)
    .then((result) => (result.json()))
    .then((resultJson) => {
        const table = document.createElement('table')
        table.setAttribute('id', 'recipeInfo');

        const tableRow = document.createElement('tr')

        const tableHeadingRecipeName = document.createElement('th')
        tableHeadingRecipeName.innerHTML = 'Recipe Name';
        tableRow.appendChild(tableHeadingRecipeName);

        const tableHeadingRecipeIngredients = document.createElement('th')
        tableHeadingRecipeIngredients.innerHTML = 'Recipe Ingredients';
        tableRow.appendChild(tableHeadingRecipeIngredients);

        table.appendChild(tableRow);

        resultJson.forEach((recipe) => {
            const recipeTableRow = document.createElement('tr')
            const recipeTableName = document.createElement('td')
            const recipeTableIngredients = document.createElement('td')

            recipeTableName.innerHTML = recipe.recipe_name
            recipeTableIngredients.innerHTML = recipe.recipe_ingredients

            recipeTableRow.appendChild(recipeTableName)
            recipeTableRow.appendChild(recipeTableIngredients)

            table.appendChild(recipeTableRow)
        })

        const preExistingTable = document.getElementById('recipeInfo');
        if(preExistingTable) {
            preExistingTable.remove();
        }

        document.body.appendChild(table)
    })
}

window.onload = loadRecipeData
