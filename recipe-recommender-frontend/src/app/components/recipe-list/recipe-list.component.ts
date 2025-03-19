import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Recipe } from '../../services/structure';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SavedService } from '../../services/saved.service';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  displayRecipes: Recipe[] = [];
  userRecipes: Recipe[] = [];
  savedRecipes: Recipe[] = [];
  ingredientBasedRecipes: Recipe[] = [];
  savedRecipesId: Set<number> = new Set();
  selectedCategory: string = '';
  searchText: string = '';
  isLoggedIn: boolean = false;
  userId: string | null = '';
  currentPage: number = 1;
  recipesPerPage: number = 6;
  totalPage: number = 1;
  activeButton = {
    allRecipe: true,
    userRecipes: false,
    savedRecipes: false,
    ingredientRecipes: false,
  };
  isIngredientModalOpen: boolean = false;
  ingredientInput: string = '';
  selectedIngredients: string[] = [];
  allIngredients: string[] = [];
  errorMessage: string = '';
  typeOfIngredientSearch: string = '';

  constructor(
    private recipeService: RecipeService,
    private savedService: SavedService,
    private viewService: ViewService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadRecipes();
    this.userService.isLoggedIn().subscribe((data) => {
      this.isLoggedIn = data;
    });
    this.userService.getUserId().subscribe((res) => {
      this.userId = res;
    });
    this.savedService
      .getSavedRecipesByUser(this.userId)
      .subscribe((savedRecipes) => {
        savedRecipes.forEach((recipe) => {
          this.savedRecipesId.add(recipe.id);
        });
      });
  }

  loadRecipes() {
    this.recipeService.getAllRecipes().subscribe((response) => {
      this.recipes = response.data;
      this.filteredRecipes = response.data;
      this.updatePaginatedRecipes();
    });
    this.selectedCategory = '';
  }

  toggleBookmark(recipeId: number): void {
    if (this.savedRecipesId.has(recipeId)) {
      this.savedService
        .deleteSavedRecipe(this.userId, recipeId?.toString())
        .subscribe(() => {
          this.savedRecipesId.delete(recipeId);
          if (this.activeButton.savedRecipes) {
            this.selectedCategory = '';
            this.searchText = '';
            this.savedService
              .getSavedRecipesByUser(this.userId)
              .subscribe((response) => {
                this.savedRecipes = response;
                this.filteredRecipes = response;
                this.currentPage = 1;
                this.updatePaginatedRecipes();
              });
          }
        });
    } else {
      this.savedService
        .addSavedRecipe(this.userId, recipeId?.toString())
        .subscribe(() => {
          this.savedRecipesId.add(recipeId);
        });
    }
  }

  filterRecipes(): void {
    this.searchText = '';
    if (this.activeButton.allRecipe) {
      this.filteredRecipes = this.recipes.filter(
        (recipe) =>
          !this.selectedCategory ||
          recipe.dietary_preferences === this.selectedCategory
      );
    } else if (this.activeButton.userRecipes) {
      this.filteredRecipes = this.userRecipes.filter(
        (recipe) =>
          !this.selectedCategory ||
          recipe.dietary_preferences === this.selectedCategory
      );
    } else if (this.activeButton.savedRecipes) {
      this.filteredRecipes = this.savedRecipes.filter(
        (recipe) =>
          !this.selectedCategory ||
          recipe.dietary_preferences === this.selectedCategory
      );
    } else if (this.activeButton.ingredientRecipes) {
      this.filteredRecipes = this.ingredientBasedRecipes.filter(
        (recipe) =>
          !this.selectedCategory ||
          recipe.dietary_preferences === this.selectedCategory
      );
    }
    this.currentPage = 1;
    this.updatePaginatedRecipes();
  }

  searchRecipe(): void {
    this.selectedCategory = '';
    if (this.activeButton.allRecipe) {
      this.filteredRecipes = this.recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(this.searchText)
      );
    } else if (this.activeButton.userRecipes) {
      this.filteredRecipes = this.userRecipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(this.searchText)
      );
    } else if (this.activeButton.savedRecipes) {
      this.filteredRecipes = this.savedRecipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(this.searchText)
      );
    } else if (this.activeButton.ingredientRecipes) {
      this.filteredRecipes = this.ingredientBasedRecipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(this.searchText)
      );
    }
    this.currentPage = 1;
    this.updatePaginatedRecipes();
  }

  updatePaginatedRecipes(): void {
    const startIndex = (this.currentPage - 1) * this.recipesPerPage;
    const endIndex = startIndex + this.recipesPerPage;
    this.totalPage = Math.ceil(
      this.filteredRecipes.length / this.recipesPerPage
    );
    this.displayRecipes = this.filteredRecipes.slice(startIndex, endIndex);
  }

  viewDetails(recipeId: number | undefined): void {
    if (this.isLoggedIn) {
      this.viewService.addView(this.userId, recipeId?.toString()).subscribe();
      this.router.navigate(['/recipes', recipeId?.toString()]);
    } else {
      alert('Please login to view details about the recipe');
    }
  }

  viewAllRecipes(): void {
    this.activeButton = {
      allRecipe: true,
      userRecipes: false,
      savedRecipes: false,
      ingredientRecipes: false,
    };
    this.filteredRecipes = this.recipes;
    this.selectedCategory = '';
    this.searchText = '';
    this.currentPage = 1;
    this.updatePaginatedRecipes();
  }

  viewUserRecipes(): void {
    this.activeButton = {
      allRecipe: false,
      userRecipes: true,
      savedRecipes: false,
      ingredientRecipes: false,
    };
    this.selectedCategory = '';
    this.searchText = '';
    this.recipeService.getRecipesByUser(this.userId).subscribe((res) => {
      this.userRecipes = res;
      this.filteredRecipes = res;
      this.currentPage = 1;
      this.updatePaginatedRecipes();
    });
  }

  viewSavedRecipes(): void {
    this.activeButton = {
      allRecipe: false,
      userRecipes: false,
      savedRecipes: true,
      ingredientRecipes: false,
    };
    this.selectedCategory = '';
    this.searchText = '';
    this.savedService
      .getSavedRecipesByUser(this.userId)
      .subscribe((response) => {
        this.savedRecipes = response;
        this.filteredRecipes = response;
        this.currentPage = 1;
        this.updatePaginatedRecipes();
      });
  }

  nextPage() {
    if (
      this.currentPage <
      Math.ceil(this.filteredRecipes.length / this.recipesPerPage)
    ) {
      this.currentPage++;
      this.updatePaginatedRecipes();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedRecipes();
    }
  }

  openIngredientSearchModal(): void {
    this.isIngredientModalOpen = true;
    this.selectedIngredients = [];
    this.ingredientInput = '';
    this.typeOfIngredientSearch = '';
    this.fetchAllIngredients();
  }

  validateIngredientInput(event: any): void {
    const validRegex = /^[a-zA-Z\s,]*$/;

    if (!validRegex.test(this.ingredientInput)) {
      this.errorMessage =
        'Enter a valid comma-separated list (e.g., Tomato, Basil, Cheese)';
      return;
    }

    this.errorMessage = '';

    this.ingredientInput = this.ingredientInput.replace(/,\s*,/g, ',').trim();
  }

  fetchAllIngredients(): void {
    this.recipeService.getAllIngredient().subscribe((ingredients) => {
      this.allIngredients = ingredients;
    });
  }

  toggleIngredientCheckbox(ingredient: string, event: any): void {
    if (this.selectedIngredients.length > 0 || event.target.checked) {
      this.ingredientInput = '';
    }
    if (event.target.checked) {
      this.selectedIngredients.push(ingredient);
    } else {
      this.selectedIngredients = this.selectedIngredients.filter(
        (data) => data !== ingredient
      );
    }
  }

  clearSearch(): void {
    this.ingredientInput = '';
    this.selectedIngredients = [];
    this.typeOfIngredientSearch = '';
  }

  searchRecipes(): void {
    this.activeButton = {
      allRecipe: false,
      userRecipes: false,
      savedRecipes: false,
      ingredientRecipes: true,
    };
    this.selectedCategory = '';
    this.searchText = '';
    let ingredients = [];
    if (this.selectedIngredients.length > 0) {
      ingredients = [...this.selectedIngredients];
    } else {
      ingredients = [
        ...new Set(this.ingredientInput.split(',').map((word) => word.trim())),
      ];
    }
    this.recipeService
      .searchRecipes(ingredients, this.typeOfIngredientSearch)
      .subscribe((recipes) => {
        this.ingredientBasedRecipes = recipes;
        this.filteredRecipes = recipes;
        this.currentPage = 1;
        this.updatePaginatedRecipes();
        this.isIngredientModalOpen = false;
      });
  }
}
