// HOME PAGE

// loads 5 random featured recipes from the spoonacular API and displays them on the home page
import API_KEY from './config.js';
export async function loadFeaturedRecipes() {
  const recipesContainer = document.getElementById('recipes-list');
  if (!recipesContainer) return;

  recipesContainer.innerHTML = '<p>Loading featured recipes...</p>';

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?number=3&includeNutrition=true&apiKey=${API_KEY}`
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
      `;
      recipesContainer.appendChild(recipeCard);
    });
  } catch (error) {
    recipesContainer.innerHTML = `<p>Error loading recipes. Please try again later.</p>`;
    console.error('Error fetching recipes:', error);
  }
}

window.addEventListener('load', loadFeaturedRecipes);


  