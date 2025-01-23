import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../services/favorite.service';
import { UserService } from '../../services/user.service';

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
  isFavorite: boolean = false;
  userId: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private favoriteService: FavoriteService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserId().subscribe((res) => {
      this.userId = res;
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService.getRecipeById(+id).subscribe({
        next: (data) => {
          this.recipe = data;
          this.ingredients = this.recipe.ingredients.split(', ');
          this.steps = this.recipe.steps.split(', ');
        },
        error: (err) => {
          console.error('Error fetching recipe:', err);
        },
      });
    }
  }

  addToFavorites(recipeId: string): void {
    this.favoriteService.addFavorite(this.userId, recipeId).subscribe({
      next: (res) => {
        alert(res.message)
      },
      error: (err) => {
        alert(err.error.message)
      }
    })
  }
}
