// HOME PAGE
const host = window.location.origin;
// loads 6 random featured recipes from the spoonacular API and displays them on the home page
import API_KEY from './config.js';
export async function loadFeaturedRecipes() {
  const recipesContainer = document.getElementById('random-recipes');
  if (!recipesContainer) return;

  recipesContainer.innerHTML = '<p>Loading featured recipes...</p>';

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?number=6&includeNutrition=true&apiKey=df603fed636c495ca7970bab03b19b4c`
    );
    const data = await response.json();
    const recipes = data.recipes;

    recipesContainer.innerHTML = '';
    recipes.forEach((recipe) => {
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card');
      recipeCard.innerHTML = `
        <h3 class="recipe-name">${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}" />
        <p><a class="recipe-url" href="${recipe.sourceUrl}" target="_blank">View Recipe</a></p>
        <button class="button-24" role="button" data-id="${recipe.id}">&#10084</button>

      `;
      recipesContainer.appendChild(recipeCard);
    });
    attachFavoriteButtonListeners();
  } catch (error) {
    recipesContainer.innerHTML = `<p>Error loading recipes. Please try again later.</p>`;
    console.error('Error fetching recipes:', error);
  }
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



window.addEventListener('load', loadFeaturedRecipes);


  