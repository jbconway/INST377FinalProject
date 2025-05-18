## Developer Manual
 
# Install Dependencies:
To clone the repository copy and paste the code below into your terminal:

Code: git clone git@github.com:jbconway/INST377FinalProject.git

Code: cd INST377FinalProject

This application utilizes Node, Supabase, Express, Body Parser, dotenv, and cors

To install node (local testing):

Code: npm install nodemon

To install supabase:

Code: npm install @supabase/supabase-js

To install express:

Code: npm install express

To install Body Parser:

Code: npm install body-parser

To install env for supabase key and url:

Code: npm install dotenv

To install cors:

Code: npm install cors

# Environment Variables and API keys:

## 1. Spoonacular API
This application utilizes the spoonacular API found at the following link:
https://spoonacular.com/food-api

In order to use this API, an API key is needed. To get it:

1. Sign up or log in at [Spoonacular API](https://spoonacular.com/food-api)
2. Navigate to your dashboard and copy your **API key**

> In this version of the application, the API key is **hardcoded** directly into the frontend JavaScript files.  
> This was approved by the professor because:
> - It uses the free version of the API.

### Spoonacular API Limits
- **150 requests per day**, resets every 24 hours.
- If you receive a **402 Payment Required** error on the Home, Search, or Substitute pages, this is likely the cause.

This application uses the following APIs in Spoonacular:

// Get 6 random recipes with nutrition info

GET: https://api.spoonacular.com/recipes/random?number=6&includeNutrition=true&apiKey=${API_KEY}

// Search recipes by ingredients

GET: https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${API_KEY}

// Get recipe info by ID

GET: https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}

// Find ingredient substitutes

GET: https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=${ingredient}&apiKey=${API_KEY}

## 2. Supabase (Database)
This application utilizes the supabase database API.
A Supabase Key and Supabase URL is needed for this application and is in a located .env file in root directory.

To get the URL and key follow these steps:

- Go to https://supabase.com and create an account
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

Save this in a .env file outside of the public folder, inside of the INST377FinalProject Folder (root directory)

// .env

SUPABASE_URL = url

SUPABASE_KEY = key

To create the supabase recipes table:
- Go to the Table Editor
- Click New Table
- Name your table "recipes"
- disable Row Level Security (RLS)

Add the following columns:
- recipe_id (int8)
- recipe_name (text)
- recipe_url (text)

Click Save and now you should have the supabase table that is incorporated in this application

These are the Supabase endpoints we use:

GET /recipes : Retrieves all saved or favorited recipes from the Supabase recipe table

FULL URL:
http://localhost:3000/recipes

POST /recipes : Adds a new recipe, including the id, name and URL, to the Supabase recipe table based on user input

FULL URL:
http://localhost:3000/recipes

When posted to this URL, the properties (recipeName, recipeURL and recipeID) are included

Both of these endpoints are used by the frontend to display data and save data entered by a user

To summarize:
Make sure the .env file is added in the root directory with the supbase key and url in order to run locally

# Running Tests
No automated test suite was created for this application.

# How to run this application locally (testing environment)
To run on a local server use the following steps:

1. Make sure all dependencies have been downloaded or it will crash
2. Use Command: npm start in home directory (INST377FinalProject)
3. Then navigate to http://localhost:3000

# How to run this application on a server (vercel)
To run on vercel use the following steps:

You can click the vercel deployment link that is listed in the github 
link: https://inst-377-final-project-wheat.vercel.app/

OR 

1. Create a Vercel Account

Go to https://vercel.com and sign up or log in using your GitHub account

2. Make sure your repository has a vercel.json file 

3. Add all Environment Variables in Vercel
- Add API_KEY
- Add SUPABASE_URL
- Add SUPABASE_KEY

Make sure to add these variables with no quotes, just the raw numbers.
If these variables are not added, the vercel deployment will fail

4. Click on the domain link
5. Vercel will auto-deploy the project

Deploy app URL: https://inst-377-final-project-wheat.vercel.app


# Known Bugs and Future Development

## Known Bugs

- On the **Search Page**, ingredients must be separated by a comma, for example: `eggs, milk, cheese`
- The application does **not authenticate users**, so favorite recipes are **not unique to each individual**
- There is **limited error handling** implemented for API calls
- If the `.env` file with **Supabase URL and Key** is missing, the backend will not function locally
- The **API_KEY for Spoonacular is hardcoded** in the codebase
- Spoonacular’s **free tier** limits usage to **150 requests per day**. If you receive a `402 Payment Required` error on the **Home**, **Substitute**, or **Search** pages, it's because the request limit has been reached for the day.


Note: This applicaiton utilizes 2 Javascript libraries 
- Simple Slider JS
- Grid.js JS


## In the future, we hope to...
- add user authentication and a way to log in to track users saved recipes
- improve the search element by expanding to not just ingredients but recommended recipes
- have the api key be hidden and increase the number of api requests allowed




