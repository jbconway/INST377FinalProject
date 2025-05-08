
// SEARCH PAGE

import API_KEY from './config.js';

export function setupSearchHandler() {
  const searchBtn = document.getElementById('searchBtn');
  const ingredientInput = document.getElementById('ingredientInput');
  const resultsContainer = document.getElementById('results');

  if (!searchBtn || !ingredientInput || !resultsContainer) return;

  searchBtn.addEventListener('click', async () => {
    const ingredients = ingredientInput.value.trim();
    if (!ingredients) {
      resultsContainer.innerHTML = '<p>Please enter at least one ingredient.</p>';
      return;
    }

    resultsContainer.innerHTML = '<p>Searching...</p>';

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
          ingredients
        )}&number=10&apiKey=${API_KEY}`
      );
      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        resultsContainer.innerHTML = '<p>No recipes found.</p>';
        return;
      }

      resultsContainer.innerHTML = '';

      // Use for...of so we can await additional fetches
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
          `;
          resultsContainer.appendChild(recipeDiv);
        } catch (error) {
          console.error(`Error fetching details for recipe ID ${recipe.id}:`, error);
        }
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      resultsContainer.innerHTML = '<p>Something went wrong. Try again later.</p>';
    }
  });
}

window.addEventListener('load', setupSearchHandler);


                                