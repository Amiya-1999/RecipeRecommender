import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-recipe-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-activity.component.html',
  styleUrl: './recipe-activity.component.css',
})
export class RecipeActivityComponent {
  mostSavedRecipes = [
    { name: 'Pasta Carbonara', image: 'assets/pasta.jpg', saves: 120 },
    { name: 'Butter Chicken', image: 'assets/butterchicken.jpg', saves: 95 },
    { name: 'Sushi Rolls', image: 'assets/sushi.jpg', saves: 85 },
  ];

  recommendedRecipes = [
    { name: 'Avocado Toast', image: 'assets/avocado-toast.jpg' },
    { name: 'Greek Salad', image: 'assets/greek-salad.jpg' },
  ];

  cookingStreak = 7 * 10; // Example: 7 days streak (scaled to %)
  trendingCuisines = [
    { name: 'Panner Butter Mashala' },
    { name: 'Chicken Biriyani' },
    { name: 'Shakshuka' },
  ];
  recentlyViewedRecipes = [
    { name: 'Chicken Burger' },
    { name: 'Chicken Tikka' },
    { name: 'Veg Chowmin' },
  ];
  usersWhoLikedSimilar = [
    { name: 'Apurba Dey' },
    { name: 'Ovi Seal' },
    { name: 'Tiya Samanta' },
  ];
  dailyRecipesCompleted: number = 2;
  dailyRecipeGoal: number = 5;
  mostFavouriteRecipes = [
    { name: 'Chicken Burger' },
    { name: 'Chicken Tikka' },
    { name: 'Veg Chowmin' },
  ];
  mostPopularRecipes = [
    { name: 'Chicken Burger' },
    { name: 'Chicken Tikka' },
    { name: 'Veg Chowmin' },
  ];
  trendingRecipes = [
    { name: 'Chicken Burger' },
    { name: 'Chicken Tikka' },
    { name: 'Veg Chowmin' },
  ];
  mostViewedRecipes = [
    { name: 'Chicken Burger' },
    { name: 'Chicken Tikka' },
    { name: 'Veg Chowmin' },
  ];
  topRatedRecipes = [
    { name: 'Chicken Burger' },
    { name: 'Chicken Tikka' },
    { name: 'Veg Chowmin' },
  ];
}
