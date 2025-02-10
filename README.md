# RecipeRecommenderFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

Need to do Enhancement:
0. Responsivenss for both mobile and tablet

Core Features

1. Ingredient-Based Recipe Search:

Users input ingredients (e.g., "tomato, cheese, basil").
The system filters and shows recipes using those ingredients.

2. Filters:

Dietary Preferences: Vegan, Vegetarian, Gluten-Free, etc.
Cuisine Type: Indian, Italian, Chinese, etc.
Cooking Time: Less than 15 mins, 30 mins, etc.

3. Save and Rate Recipes:

Save favorite recipes for later.
Rate recipes to help others decide.
User Accounts:

Advanced Features 
4. AI-Powered Recommendations:

Suggest recipes based on user preferences, past interactions, or even mood.
Interactive Cooking Guide:

Step-by-step instructions with progress tracking.
Timer integration for steps like "boil for 10 minutes."

5. Meal Planner:

Weekly meal planner to organize recipes and generate shopping lists.

6. Social Features:

Share recipes on social media.
Follow other users to see their recipes.

7. Image Recognition:

Allow users to upload photos of ingredients, and the app detects and lists them.

8. Extra

Reward badges for uploading recipes, rating, or consistently using the app.
Display cooking progress with animations (e.g., progress bars or timers)
Connect to smart kitchen devices to automate certain steps (e.g., oven settings).
Add voice guidance for cooking steps using Web Speech API.
Cache recipes locally for offline access using service workers.
Use AR to overlay recipe steps in real time while cooking.

Include Save for later options

9. 📝 Meal Planner:

Allow users to plan meals for the week using their saved recipes.
Position: New Header Item → Name it "Meal Plan"
Inside, users can drag & drop saved recipes into breakfast, lunch, and dinner slots.
📜 Shopping List:

Users can generate a shopping list based on recipes they want to cook.
Position: Inside Insights or as a separate tab
When users save a recipe, they can auto-generate a shopping list for ingredients.
👨‍🍳 Recipe Challenges:

Users get weekly challenges, like “Cook a Vegan Dish” or “Make a 30-min Meal.”
Position: Inside Insights or as a separate tab
They can complete challenges & earn badges.
🌟 Trending Recipes:

Show trending recipes based on user activity.
Position: Inside Explore (as a dedicated tab).
