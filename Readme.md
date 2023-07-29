# CulinaryAlchemy

CulinaryAlchemy is an online platform that aims to revolutionize the way people discover, share, and explore recipes. It provides a vibrant and inclusive community for individuals with diverse dietary needs, home cooks, and food enthusiasts. Our mission is to inspire, connect, and empower users through the sharing and discovery of culinary creations, promoting creativity and healthy eating choices.

## Table of Contents

- [Introduction](#culinaryalchemy)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
- [Contributions](#contributions)
- [License](#license)

## Key Features

### MVP

- **User Sign In / Sign Up** Simple sign-in with email and password. A sign-up with username, email, and password.
- **Recipes feed** Feed with recipes list with title, valoration, and recipe picture for each recipe. when a recipe is clicked, a "details" modal must be open showing the recipe ingredients, steps, cuisine type, and valoration.
- **User profile** In a Twitter style, a profile layout of the User name, profile picture, banner, location, and external website link. While showing the user-posted recipes in a list.
- **Favourite Recipes:** Save your favorite recipes for quick access in a list.

### Extended version

- **Diverse Dietary Support:** Tailor recipes to specific dietary needs and preferences such as vegetarian, vegan, gluten-free, and more. Our platform ensures inclusivity and caters to a wide range of dietary restrictions.
- **Nutritional Information:** Access detailed nutritional information for each recipe, including calories, macronutrients, and allergen information. Make informed choices that align with your dietary goals.
- **Ingredient Substitutions:** Adapt recipes to suit your dietary needs and allergies with our ingredient substitution feature. Swap out ingredients while maintaining the deliciousness of the dish.
- **Weekly Highlighted Recipes:** Discover trending and seasonal dishes with our curated collection of weekly highlighted recipes. Get inspired and expand your culinary horizons.
- **Interactive Cooking Guides:** Enhance your cooking skills with step-by-step tutorials for selected recipes. Visualize the process through images, videos, and animations to master new techniques.
- **Engagement and Feedback:** Interact with the community through commenting, rating, and following features. Build connections, share tips, and receive valuable feedback on your culinary creations.
- **Advanced Search and Filtering:** Find recipes that match your preferences with our powerful search and filtering options. Search by ingredients, dietary preferences, categories, and more.
- **Personalized Feeds:** Enjoy a tailored recipe feed based on your profile's dietary preferences and interests. Discover recipes that cater to your unique tastes.
- **Favourite Recipes:** Save your favorite recipes for quick access and create your personalized cookbook

## Technologies Used

- **Backend:**
  - main:
    - Node.js, Express, Sequelize, SQLite, and Typescript.
  - extra:
    - express validator: validate request params & body
    - bcrypt: encrypt passwords
    - passport jwt: auth with JSON web tokens
    - cors: Security
- **Backend:**
  - main:
    - React, React Router Dom, JoyUI.
  - extra:
    - React Hook Form
    - Zod
    - Axios
    - SWR

## Project Setup

To set up the RecipeAlchemy project locally, please follow these steps:

1. Clone this repository to your local machine.
2. Install the necessary dependencies by running `npm install` in `apps/server` and `apps/web-apps`.

### Backend

1. Create a `.env` file in the root of `apps/server/` with the next variables:

    |- `JWT_SECRET`: the jwt secret signature
    |- `PORT`: the port in which to run the backend development server (default set to `3000`).

2. Run the backend server using `npm run dev` in the directory `apps/server`

### Fronted

1. Run the frontend development server using `npm dev` in the directory `apps/web-app`.
2. Access the CulinaryAlchemy platform in your browser at `http://localhost:5173/` or to your environment port var.

## Contributions

We welcome contributions to enhance RecipeAlchemy. If you have any ideas, bug fixes, or improvements, feel free to submit a pull request. Please ensure that your code follows the established coding conventions and includes appropriate tests.

## License

[Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://github.com/CulinaryAlchemy/CulinaryAlchemy/blob/main/LICENSE.mdAll)

We hope that RecipeAlchemy becomes your go-to platform for culinary inspiration, recipe sharing, and connecting with fellow food enthusiasts. Happy cooking!
