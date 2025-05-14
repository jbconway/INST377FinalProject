// HOME PAGE

// loads 6 random featured recipes from the spoonacular API and displays them on the home page
import API_KEY from './config.js';
export async function loadFeaturedRecipes() {
  const recipesContainer = document.getElementById('random-recipes');
  if (!recipesContainer) return;

  recipesContainer.innerHTML = '<p>Loading featured recipes...</p>';

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?number=6&includeNutrition=true&apiKey=${API_KEY}`
    );
    const data = await response.json();
    const recipes = data.recipes;

    recipesContainer.innerHTML = '';
    recipes.forEach((recipe) => {
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card');
      recipeCard.innerHTML = `
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}" />
        <p><a href="${recipe.sourceUrl}" target="_blank">View Recipe</a></p>
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

function attachFavoriteButtonListeners() {
  document.querySelectorAll('.button-24').forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('favorited');

      if (button.classList.contains('favorited')) {
        console.log("Added to favorites");
      } else {
        console.log("Removed from favorites");
      }
    });
  });
}



window.addEventListener('load', loadFeaturedRecipes);


  