# INST377 Final Project

# RecipeMe

## Project Description  
RecipeMe is a web application that helps users search for recipes based on the ingredients they already have at home, helping reduce food waste. Users can view detailed recipe information, find ingredient substitutes, and save their favorite recipes for quick access later. The app uses the Spoonacular API for recipe and ingredient data, and Supabase to store and display users' favorite recipes.

## Target Browsers  
RecipeMe is designed to work on modern browsers, including:

- **Google Chrome** (latest versions on macOS, Windows, Android)  
- **Safari** (latest versions on macOS and iOS)  
- **Firefox** (latest versions on Windows/macOS)  
- **Edge** (latest versions on Windows)  
- **iOS Safari** (iPhone 11 and up)  
- **Android Chrome** (Android 10+)

## Developer Manual  
A full developer setup and deployment guide can be found below:  

## Authors  
**Hannah Richard**  
**Jillian Conway**  
Information Science undergraduate students at the University of Maryland


## Developer Manual

# How to install this application and all dependencies
 
To glone the repository copy and paste the code below into your terminal
code: git@github.com:jbconway/INST377FinalProject.git

This application utlizes Node, Supabase, Express, Body Parser, and dotenv

To install node:
Code: npm install nodemon

To install supabase:
Code: npm install @supabase/supabase-js

To install express:
Code: npm install express

To install Body Parser:
Code: npm install body-parser

To install dotenv:
Code: install dotenv

# How to run this application on a server
To run this application use the following command:
Command: npm start

The default port is localhost:3000

# How to run any tests you have written for your software

# The API for your server application - all GET, POST, PATCH, etc endpoints, and what they each do
1. This application utilizes the spoonacular API found at the following link:
https://spoonacular.com/food-api

In order to use this API, an API key is needed and can be found here
1. Sign up or log in at https://spoonacular.com/food-api
2. Navigate to your dashboard and copy your **API key**
3. Create a `.config` file in the root directory and paste the following:

// config.js
const API_KEY = 'your_spoonacular_api_key';
export default API_KEY;

Spoonacular ENDPOINTS

GET - recipes/random?number=6&includeNutrition=true : Returns a list of 6 random recipes with nutrition info
Full URL:
`https://api.spoonacular.com/recipes/random?number=6&includeNutrition=true&apiKey=${API_KEY}`

GET - /recipes/findByIngredients : Search for recipes by a list of ingredients
FULL URL:
`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${API_KEY}`;

GET - /recipes/{id}/information : Get detailed information for a specific recipe by ID
FULL URL:
`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`

GET - /food/ingredients/substitutes : Get suggested substitutes for a given ingredient
FULL URL:
`https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=${encodeURIComponent(ingredient)}&apiKey=${API_KEY}`;

2. This application utilizes the supabase database API found at the following link:
A Supabase Key and Supabase URL is needed for this application

# A clear set of expectations around known bugs and a road-map for future development
