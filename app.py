from fastapi import FastAPI, Query, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
import requests
import json
from pathlib import Path

API_KEY = "c8df84396b0c4259acb0291783441d69"

SAVED_RECIPES_FILE = Path("saved_recipes.json")
# Initialize the JSON file if it doesn't exist
if not SAVED_RECIPES_FILE.exists():
    SAVED_RECIPES_FILE.write_text("[]")


app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with the actual frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/recipes")
def get_recipes(query: str = Query(..., min_length=1)):
    """
    Fetch a list of recipes based on the query.
    """
    url = f"https://api.spoonacular.com/recipes/complexSearch"
    params = {
        "apiKey": API_KEY,
        "query": query,
        "number": 10,
        "instructionsRequired": True,
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()["results"]
    raise HTTPException(status_code=500, detail="Error fetching recipes")

@app.get("/recipe/{recipe_id}")
def get_recipe(recipe_id: int):
    """
    Fetch detailed information for a specific recipe.
    """
    url = f"https://api.spoonacular.com/recipes/{recipe_id}/information"
    params = {"apiKey": API_KEY}
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    raise HTTPException(status_code=404, detail="Recipe not found")


@app.post("/save-recipe/")
def save_recipe(recipe: dict = Body(...)):
    """
    Save a recipe to a JSON file.
    """
    try:
        # Read existing recipes
        with open(SAVED_RECIPES_FILE, "r") as file:
            saved_recipes = json.load(file)

        # Check if the recipe is already saved
        if any(r["id"] == recipe["id"] for r in saved_recipes):
            raise HTTPException(status_code=400, detail="Recipe already saved.")

        # Append the new recipe
        saved_recipes.append(recipe)

        # Write back to the file
        with open(SAVED_RECIPES_FILE, "w") as file:
            json.dump(saved_recipes, file, indent=4)

        return {"message": "Recipe saved successfully!"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.get("/saved-recipes/")
def get_saved_recipes():
    """
    Retrieve all saved recipes from the JSON file.
    """
    try:
        with open(SAVED_RECIPES_FILE, "r") as file:
            saved_recipes = json.load(file)
        return saved_recipes

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
