
// SEARCH PAGE



import API_KEY from './config.js';

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
      .map(ing => ing.trim().replace(/\s+/g, '+')) // replace spaces with +
      .filter(ing => ing.length > 0);

    const ingredients = ingredientsArray.join(',+'); // keep commas between ingredients

    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${API_KEY}`;
    console.log('API Request URL:', apiUrl); 

    resultsContainer.innerHTML = '<p>Searching...</p>';

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        resultsContainer.innerHTML = '<p>No recipes found.</p>';
        return;
      }

      resultsContainer.innerHTML = '';

      for (const recipe of data) {
        try {
          const infoResponse = await fetch(
            `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`
          );
          const recipeInfo = await infoResponse.json();

          const recipeDiv = document.createElement('div');
          recipeDiv.classList.add('recipe-card');
          recipeDiv.innerHTML = `
            <h3>${recipeInfo.title}</h3>
            <img src="${recipeInfo.image}" alt="${recipeInfo.title}" />
            <p><a href="${recipeInfo.sourceUrl}" target="_blank">View Recipe</a></p>
            <button class="button-24" role="button" data-id="${recipe.id}">&#10084</button>
          `;
          resultsContainer.appendChild(recipeDiv);
        } catch (error) {
          console.error(`Error fetching details for recipe ID ${recipe.id}:`, error);
        }
        attachFavoriteButtonListeners();
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      resultsContainer.innerHTML = '<p>Something went wrong. Try again later.</p>';
    }
  });
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


window.addEventListener('load', setupSearchHandler);


                                