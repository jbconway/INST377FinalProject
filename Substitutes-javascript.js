import API_KEY from './config.js';

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

    const url = `https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=${encodeURIComponent(ingredient)}&apiKey=${API_KEY}`;
    console.log("Fetching from:", url);

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!data.substitutes || data.substitutes.length === 0) {
        resultsContainer.innerHTML = "<p>No substitutes found.</p>";
        return;
      }

      // Build HTML table
      let tableHTML = `
        <h3>Substitutes for "${data.ingredient}"</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Substitute</th>
            </tr>
          </thead>
          <tbody>
      `;

      data.substitutes.forEach((sub, index) => {
        tableHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${sub}</td>
          </tr>
        `;
      });

      tableHTML += `
          </tbody>
        </table>
      `;

      resultsContainer.innerHTML = tableHTML;

    } catch (err) {
      console.error("Error fetching substitutes:", err);
      resultsContainer.innerHTML = "<p>Failed to get substitute info.</p>";
    }
  });
}

window.addEventListener('load', setupSubstituteSearch);
