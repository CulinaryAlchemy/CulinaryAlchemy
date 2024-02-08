# CulinaryAlchemy

[![pipeline](https://github.com/CulinaryAlchemy/CulinaryAlchemy/actions/workflows/pipeline.yaml/badge.svg)](https://github.com/CulinaryAlchemy/CulinaryAlchemy/actions/workflows/pipeline.yaml)

Recipes social media

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

## Technologies Used

- **Backend:**
  - main:
    - Node.js, Express, Sequelize, Postgress, and Typescript.
  - extra:
    - express validator: validate request params & body
    - bcrypt: encrypt passwords
    - passport jwt: auth with JSON web tokens
    - cors: Security
- **Frontend:**
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
