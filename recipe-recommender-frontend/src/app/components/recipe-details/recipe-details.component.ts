import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent {
  recipe: any;
  ingredients: string[] = [];
  steps: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService.getRecipeById(+id).subscribe({
        next: (data) => {
          this.recipe = {
            ...data,
            nutrition: data.nutrition || {},
            related_recipes: data.related_recipes || [],
          };
          this.ingredients = this.recipe.ingredients.split(', ');
          this.steps = this.recipe.steps.split(', ');
        },
        error: (err) => {
          console.error('Error fetching recipe:', err);
        },
      });
    }
  }

  addToFavorites(recipeId: number): void {
    console.log(`Adding recipe ${recipeId} to favorites`);
    // Implement favorite addition logic here
  }
}
