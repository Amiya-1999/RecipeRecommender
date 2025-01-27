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

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  displayRecipes: Recipe[] = [];
  userRecipes: Recipe[] = [];
  selectedCategory: string = '';
  searchText: string = '';
  isLoggedIn: boolean = false;
  userId: string | null = '';
  isAllRecipeActive: boolean = true;
  currentPage: number = 1;
  recipesPerPage: number = 6;
  totalPage: number = 1;

  constructor(
    private recipeService: RecipeService,
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
  }

  loadRecipes() {
    this.recipeService.getAllRecipes().subscribe((response) => {
      this.recipes = response.data;
      this.filteredRecipes = response.data;
      this.updatePaginatedRecipes();
    });
    this.selectedCategory = '';
  }

  filterRecipes(): void {
    this.searchText = '';
    if (this.isAllRecipeActive) {
      this.filteredRecipes = this.recipes.filter(
        (recipe) =>
          !this.selectedCategory ||
          recipe.dietary_preferences === this.selectedCategory
      );
    } else {
      this.filteredRecipes = this.userRecipes.filter(
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
    if (this.isAllRecipeActive) {
      this.filteredRecipes = this.recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(this.searchText)
      );
    } else {
      this.filteredRecipes = this.userRecipes.filter((recipe) =>
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
      this.router.navigate(['/recipes', recipeId?.toString()]);
    } else {
      alert('Please login to view details about the recipe');
    }
  }

  viewAllRecipes(): void {
    this.isAllRecipeActive = true;
    this.filteredRecipes = this.recipes;
    this.selectedCategory = '';
    this.searchText = '';
    this.currentPage = 1;
    this.updatePaginatedRecipes();
  }

  viewUserRecipes(): void {
    this.isAllRecipeActive = false;
    this.selectedCategory = '';
    this.searchText = '';
    this.recipeService.getRecipesByUser(this.userId).subscribe((res) => {
      this.userRecipes = res;
      this.filteredRecipes = res;
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
}
