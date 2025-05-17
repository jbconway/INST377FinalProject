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
 
# Install Dependencies:
To glone the repository copy and paste the code below into your terminal
Code: git clone git@github.com:jbconway/INST377FinalProject.git
Code: cd INST377FinalProject

This application utilizes Node, Supabase, Express, Body Parser, and dotenv

To install node:
Code: npm install nodemon

To install supabase:
Code: npm install @supabase/supabase-js

To install express:
Code: npm install express

To install Body Parser:
Code: npm install body-parser

To install env for supabase key and url:
Code: npm install dotenv


# Create necessary files and API keys:
1. This application utilizes the spoonacular API found at the following link:
https://spoonacular.com/food-api

In order to use this API, an API key is needed and can be found here
1. Sign up or log in at https://spoonacular.com/food-api
2. Navigate to your dashboard and copy your **API key**
3. Create a `config.js` file in the root directory and paste the following:

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
A Supabase Key and Supabase URL is needed for this application and is in a located .env file

To get the URL and key follow these steps:
Step 1: Create a Supabase Account
- Go to https://supabase.com
- Click Start your project
- Sign in with GitHub
- Once logged in, click New Project

- Enter a project name
- Choose a password (you’ll need this to access the database)
- Select a region close to you
- Click Create new project

- Go to the Project Dashboard
- Click Settings → API
- Copy the following:
Project URL → This is your SUPABASE_URL
anon public key → This is your SUPABASE_KEY
Save this in a .env file in the supabaseFinalProject folder
// .env
SUPABASE_URL = url
SUPABASE_KEY = key

To create the recipes table:
- Go to the Table Editor
- Click New Table
- Name your table "recipes"
- disable Row Level Security (RLS)
Add the following columns:
- recipe_id (int8)
- recipe_name (text)
- recipe_url (text)
Click Save and now you should have the supabase table that is incorporated in this application

Supabase ENDPOINTS:
GET /recipes : Retrieves all saved recipes from the Supabase recipe table
FULL URL:
http://localhost:3000/recipes
POST /recipes : Adds a new recipe, including the name and URL, to the Supabase recipe table based on user input
FULL URL:
http://localhost:3000/recipes

Both of these endpoints are used by the frontend to display data and save data entered by a user


# How to run this application on a server
To run on a local server use the following command:
Command: 
npm start

To run on vercel use the following steps:
1. Create a Vercel Account
Go to https://vercel.com
Sign up or log in using your GitHub, GitLab, or Bitbucket account

2. Make sure your repository has a vercel.json file with the 

The default port is localhost:3000


# A clear set of expectations around known bugs and a road-map for future development
Bugs
- On the search page, ingredients must be separated by a comma for example 'eggs, milk, cheese'
- This application does not authenticate each individual user so favorite recipes are not specific to an individual
- There is little error handling implemented for the API calls

In the future, we hope to...
- add user authentication and a way to log in to track user recipes
- improve the search element by expanding to not just ingredients but recommended recipes




