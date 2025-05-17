const express = require('express');
const cors = require('cors');           // Add CORS support so frontend can access API
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());                        // Enable CORS for all routes
app.use(express.json());                // Parse JSON bodies

// Serve static frontend if needed
app.use(express.static(__dirname + '/public'));

// Load Supabase environment variables from .env file
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Log to verify env variables loaded
console.log('SUPABASE_URL:', supabaseUrl ? 'Loaded' : 'Missing');
console.log('SUPABASE_KEY:', supabaseKey ? 'Loaded' : 'Missing');

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
   res.sendFile('public/HomePage.html', { root: __dirname });
 });

// GET endpoint: fetch all recipes
app.get('/recipes', async (req, res) => {
  const { data, error } = await supabase.from('recipes').select();
  if (error) {
    console.error('Error fetching recipes:', error);
    return res.status(400).json({ error: error.message });
  }
  res.json(data);
});

// POST endpoint: add a new recipe
// app.post('/recipes', async (req, res) => {
//   const { recipe_name, recipe_ingredients } = req.body;

//   if (!recipe_name || !recipe_ingredients) {
//     return res.status(400).json({ error: 'recipe_name and recipe_ingredients are required' });
//   }

//   const { data, error } = await supabase
//     .from('recipes')
//     .insert([{ recipe_name, recipe_ingredients }])
//     .select();

//   if (error) {
//     console.error('Error inserting recipe:', error);
//     return res.status(500).json({ error: error.message });
//   }

//   res.status(201).json(data);
// });
app.post('/recipes', async (req, res) => {
  const { recipe_id, recipe_name, recipe_url } = req.body;

  if (!recipe_name || !recipe_url) {
    return res.status(400).json({ error: 'recipe_name and recipe_url are required' });
  }

  const { data, error } = await supabase
    .from('recipes')
    .insert([{ recipe_id, recipe_name, recipe_url }])
    .select();

  if (error) {
    console.error('Error inserting recipe:', error);
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

// (Optional) DELETE endpoint: remove a recipe by ID
app.delete('/recipes', async (req, res) => {
  const { recipe_id } = req.body;

  if (!recipe_id) {
    return res.status(400).json({ error: 'recipe_id is required' });
  }

  const { data, error } = await supabase
    .from('recipes')
    .delete()
    .eq('recipe_id', recipe_id);

  if (error) {
    console.error('Error deleting recipe:', error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
