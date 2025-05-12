const express = require('express'); 
const supabaseClient = require('@supabase/supabase-js');
const bodyParser = require('body-parser')
// const { isValidStateAbbreviation } = required('usa-state-validator) if we want to add a js library we can

const app = express()
const port = 3000;

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
const supabaseUrl = 'https://eakdvhvmrmopemmdvmeg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVha2R2aHZtcm1vcGVtbWR2bWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwODIwNDgsImV4cCI6MjA2MjY1ODA0OH0.KjPBYB1quxJCdAUTHa15OejBLRNLDAH_TuwL5Royslk';
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/recipes', async (req, res) => {
    console.log('Attempting to GET all recipes')

    const { data, error } = await supabase.from('recipes').select();

    if(error) {
        console.log(`Error: ${error}`);
        res.statusCode = 400
        res.send(error);
    }

    res.send(data)
})

app.post('/recipes', async (req, res) => {
    console.log('Adding recipe')

    console.log(req.body);
    const recipeName = req.body.recipe_name;
    const recipeIngredients = req.body.recipe_ingredients;

    // this is for a library if we wanted to add one, but we would use a different one bc state doesnt make sense for this project
    // if(!isValidStateAbbreviation(state) {
    // console.error(`State: ${state}, is Invalid`);
    // res.statusCode = 400;
    // res.header('Content-type', 'application/json')
    // const errorJson = {
    // 'message': `${state} is not a valid state`}
    //
    // res.send(JSON.stringify(errorJson));
    // return;
    //})

    const { data, error } = await supabase
  .from('recipes')
  .insert({ recipe_name: recipeName, recipe_ingredients: recipeIngredients })
  .select()

  if(error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500
    res.send(error);
}

    res.send(data);
})

app.listen(port, () => {
    console.log('App is alive on port', port)
});
