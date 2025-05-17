// SEARCH PAGE

const host = window.location.origin;

export function setupSearchHandler() {
  const searchBtn = document.getElementById('searchBtn');
  const ingredientInput = document.getElementById('ingredientInput');
  const resultsContainer = document.getElementById('results');

  if (!searchBtn || !ingredientInput || !resultsContainer) return;

  searchBtn.addEventListener('click', async () => {
    const rawInput = ingredientInput.value.trim();
    if (!rawInput) {
      resultsContainer.innerHTML = '<p>Please enter at least one ingredient.</p>';
      return;
    }

    const ingredientsArray = rawInput
      .split(',')
      .map(ing => ing.trim().replace(/\s+/g, '+'))
      .filter(ing => ing.length > 0);

    const ingredients = ingredientsArray.join(',+');

    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=df603fed636c495ca7970bab03b19b4c`;
    console.log('API Request URL:', apiUrl);

    resultsContainer.innerHTML = '<p>Searching...</p>';

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        resultsContainer.innerHTML = '<p>No recipes found.</p>';
        return;
      }

      let allRecipesHTML = '';

      for (const recipe of data) {
        try {
          const infoResponse = await fetch(
            `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=df603fed636c495ca7970bab03b19b4c`
          );
          const recipeInfo = await infoResponse.json();

          allRecipesHTML += `
            <div class="recipe-card">
              <h3 class="recipe-name">${recipeInfo.title}</h3>
              <img src="${recipeInfo.image}" alt="${recipeInfo.title}" />
              <p><a class="recipe-url" href="${recipeInfo.sourceUrl}" target="_blank">View Recipe</a></p>
              <button class="button-24" role="button" data-id="${recipe.id}">&#10084</button>
            </div>
          `;
        } catch (error) {
          console.error(`Error fetching details for recipe ID ${recipe.id}:`, error);
        }
      }

      resultsContainer.innerHTML = allRecipesHTML;
      attachFavoriteButtonListeners();

    } catch (error) {
      console.error('Error fetching recipes:', error);
      resultsContainer.innerHTML = '<p>Something went wrong. Try again later.</p>';
    }
  });
}

// function attachFavoriteButtonListeners() {
//   document.querySelectorAll('.button-24').forEach(button => {
//     button.addEventListener('click', () => {
//       button.classList.toggle('favorited');

//       if (button.classList.contains('favorited')) {
//         console.log("Added to favorites");
//       } else {
//         console.log("Removed from favorites");
//       }
//     });
//   });
// }
function attachFavoriteButtonListeners() {
  document.querySelectorAll('.button-24').forEach(button => {
    button.addEventListener('click', async () => {
      button.classList.toggle('favorited');

      const recipeCard = button.closest('.recipe-card');
      const recipeId = button.dataset.id;  // Get recipe ID from button's data-id attribute
      const recipeName = recipeCard.querySelector('.recipe-name')?.textContent;
      const recipeUrl = recipeCard.querySelector('.recipe-url')?.href;

      if (button.classList.contains('favorited')) {
        console.log("Added to favorites");

      console.log('Sending:', {
        recipe_id: recipeId,
        recipe_name: recipeName,
        recipe_url: recipeUrl
      });

      // Send POST to Supabase via Express
      await fetch(`${host}/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipe_id: recipeId,
          recipe_name: recipeName,
          recipe_url: recipeUrl
          })
        });
      } else {
        console.log("Removed from favorites");

        // Send DELETE to Supabase via Express
        await fetch(`${host}/recipes`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            recipe_id: recipeId
          })
        });
      }
    });
  });
}


window.addEventListener('load', setupSearchHandler);


                                