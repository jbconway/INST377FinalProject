const host = window.location.origin;
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(`${host}/recipes`);
    const recipes = await response.json();

    // Convert Supabase data to Grid.js rows
    const rows = recipes.map(recipe => [
      recipe.recipe_id || recipe.id,
      recipe.recipe_name,
      gridjs.html(`<a href="${recipe.recipe_url}" target="_blank">View Recipe</a>`)
    ]);

    new gridjs.Grid({
      columns: ['ID', 'Name', 'Link'],
      data: rows,
      search: true,
      pagination: {
        enabled: true,
        limit: 5
      },
      sort: true,
      resizable: true,
    }).render(document.getElementById('favorites-table'));

  } catch (err) {
    console.error('Error loading favorite recipes:', err);
    document.getElementById('favorites-table').innerHTML = '<p>Error loading recipes.</p>';
  }
});
