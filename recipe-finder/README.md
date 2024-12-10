🍴 Recipe Finder

The Recipe Finder is a web application that allows users to search for recipes by ingredient(s). Users can view a list of matching recipes, see a preview of each recipe with a thumbnail image, and click for more detailed information, including ingredients and instructions.

The app is built with FastAPI for the backend and React for the frontend.

🚀 Features

Search Recipes: Enter ingredients to search for matching recipes.
Recipe List: View a list of recipe results with thumbnails.
Recipe Details: Click on any recipe to view detailed information, including ingredients and cooking instructions.
Dynamic Carousel: Includes an emoji carousel for enhanced user interaction.
Responsive Design: Optimized for both desktop and mobile devices.
🛠️ Technologies Used

Backend
FastAPI: Backend framework for building REST APIs.
Spoonacular API: External API for fetching recipe data.
Python 3.9+
Frontend
React: Frontend framework for building user interfaces.
CSS: For styling the application.
🖥️ Installation and Setup

Backend
Clone the repository:
git clone https://github.com/your-username/recipe-finder.git
cd recipe-finder/backend
Install dependencies:
pip install -r requirements.txt
Run the FastAPI server:
uvicorn main:app --reload
The server will be available at http://127.0.0.1:8000.
Frontend
Navigate to the frontend folder:
cd ../frontend
Install dependencies:
npm install
Start the React development server:
npm start
The frontend will be available at http://localhost:3000.
📂 Project Structure

recipe-finder/
├── backend/
│ ├── main.py # FastAPI backend application
│ ├── requirements.txt # Backend dependencies
│ └── ...
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── App.js # Main React app
│ │ └── ...
│ └── package.json # Frontend dependencies
└── README.md
🔑 API Keys

This app uses the Spoonacular API for fetching recipe data.

Sign up for a Spoonacular API key here.
Replace the placeholder in backend/main.py with your API key:
API_KEY = "your-api-key"
🌟 Usage

Search for Recipes: Enter an ingredient (e.g., "chicken") into the search bar and click search.
View Recipes: Browse the list of recipes with images and titles.
Detailed Recipe View: Click "More Info" to view the full recipe details on a new page.
🎨 Styling

All CSS styles are located in separate .css files in the frontend/src/styles folder.

🔧 Troubleshooting

react-router-dom Error: If you encounter a Module not found error for react-router-dom, ensure it is installed:
npm install react-router-dom
CORS Issues: If the browser blocks API requests due to CORS, configure FastAPI to allow CORS in main.py:
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
CORSMiddleware,
allow_origins=["http://localhost:3000"], # Adjust as needed
allow_methods=["*"],
allow_headers=["*"],
)
🙌 Contributions

Contributions are welcome! Feel free to submit a pull request or open an issue to suggest features or report bugs.

📜 License

This project is licensed under the MIT License. See the LICENSE file for more details.

💡 Author
Created by Csilla Toth. Reach out to me on LinkedIn or GitHub for feedback or collaboration!
