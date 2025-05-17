
export function setupSubstituteSearch() {
  const button = document.getElementById('findSubstitutesBtn');
  const input = document.getElementById('ingredientInput');
  const resultsContainer = document.getElementById('substituteResults');

  if (!button || !input || !resultsContainer) return;

  button.addEventListener('click', async () => {
    const ingredient = input.value.trim();

    if (!ingredient) {
      alert("Please enter an ingredient.");
      return;
    }

    const url = `https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=${encodeURIComponent(ingredient)}&apiKey=df603fed636c495ca7970bab03b19b4c`;
    console.log("Fetching from:", url);

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!data.substitutes || data.substitutes.length === 0) {
        resultsContainer.innerHTML = "<p>No substitutes found.</p>";
        return;
      }

      // Clear previous Grid if it exists
      resultsContainer.innerHTML = "";

      new gridjs.Grid({
        columns: ["#", `Substitutes for "${data.ingredient}"`],
        data: data.substitutes.map((sub, i) => [i + 1, sub]),
        search: false,
        pagination: { enabled: true, limit: 5 },
        sort: true,
        style: {
          table: { width: '100%' }
        }
      }).render(resultsContainer);

    } catch (err) {
      console.error("Error fetching substitutes:", err);
      resultsContainer.innerHTML = "<p>Failed to get substitute info.</p>";
    }
  });
}

window.addEventListener('load', setupSubstituteSearch);
