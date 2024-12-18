import pytest
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

API_KEY = "c8df84396b0c4259acb0291783441d69"  # Use the correct API key for testing

@pytest.fixture
def mocked_recipes_response():
    """A mock response for the /recipes endpoint."""
    return {
        "results": [
            {"id": 1, "title": "Spaghetti", "image": "image1.jpg"},
            {"id": 2, "title": "Chicken Soup", "image": "image2.jpg"},
        ]
    }

@pytest.fixture
def mocked_recipe_detail_response():
    """A mock response for the /recipe/{recipe_id} endpoint."""
    return {
        "id": 1,
        "title": "Spaghetti",
        "image": "image1.jpg",
        "extendedIngredients": [{"original": "200g spaghetti"}, {"original": "100g cheese"}],
        "analyzedInstructions": [{"steps": [{"step": "Boil spaghetti"}, {"step": "Add cheese"}]}],
    }

# Mocking `requests` with monkeypatch
@pytest.fixture
def mock_requests_get(monkeypatch, mocked_recipes_response, mocked_recipe_detail_response):
    class MockResponse:
        def __init__(self, json_data, status_code):
            self.json_data = json_data
            self.status_code = status_code

        def json(self):
            return self.json_data

    def mock_get(url, params=None):
        if "complexSearch" in url:
            return MockResponse(mocked_recipes_response, 200)
        elif "information" in url:
            return MockResponse(mocked_recipe_detail_response, 200)
        return MockResponse(None, 404)

    monkeypatch.setattr("requests.get", mock_get)

def test_get_recipes(mock_requests_get):
    """Test the /recipes endpoint."""
    response = client.get("/recipes", params={"query": "chicken"})
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["title"] == "Spaghetti"

def test_get_recipe_detail(mock_requests_get):
    """Test the /recipe/{recipe_id} endpoint."""
    recipe_id = 1
    response = client.get(f"/recipe/{recipe_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == recipe_id
    assert data["title"] == "Spaghetti"
    assert "extendedIngredients" in data
    assert len(data["extendedIngredients"]) > 0
    assert data["extendedIngredients"][0]["original"] == "200g spaghetti"
