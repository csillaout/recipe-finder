from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import secret


app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with the actual frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/healthz")
async def health_check():
    return {"status": "ok"}


@app.get("/recipes")
def get_recipes(query: str = Query(..., min_length=1)):
    """
    Fetch a list of recipes based on the query.
    """
    url = f"https://api.spoonacular.com/recipes/complexSearch"
    params = {
        "apiKey": secret.API_KEY,
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
    params = {"apiKey": secret.API_KEY}
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    raise HTTPException(status_code=404, detail="Recipe not found")