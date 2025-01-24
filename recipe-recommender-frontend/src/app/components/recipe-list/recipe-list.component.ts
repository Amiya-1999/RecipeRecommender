import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  selectedCategory: string = '';
  searchText: string = '';
  currentPage = 1;
  totalPages = 1;
  pageSize = 6;
  isLoggedIn: boolean = false;
  isAddingRecipe: boolean = false;
  userId: string | null = '';
  newRecipeForm: FormGroup;
  isAllRecipeActive: boolean = true;

  constructor(private recipeService: RecipeService, private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.newRecipeForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      ingredients: ["", Validators.required],
      steps: ["", Validators.required],
      image_url: ["", Validators.required],
      cuisine: ["", Validators.required],
      dietary_preferences: ["", Validators.required],
      cooking_time: [0, Validators.required],
    })
  }

  ngOnInit() {
    this.loadRecipes();
    this.userService.isLoggedIn().subscribe((data) => {
      this.isLoggedIn = data;
    });
    this.userService.getUserId().subscribe((res) => {
      this.userId = res;
    });
  }

  viewDetails(recipeId: number | undefined): void {
    if(this.isLoggedIn) {
      this.router.navigate(['/recipes', recipeId?.toString()])
    }
    else {
      alert("Please login to view details about the recipe")
    }
  }

  filterRecipes(): void {
    this.filteredRecipes = this.recipes.filter(
      (recipe) => !this.selectedCategory || recipe.dietary_preferences === this.selectedCategory
    );
  }

  searchRecipe(): void {
    this.filteredRecipes = this.recipes.filter(
    (recipe) => recipe.name.toLowerCase().includes(this.searchText)
    );
  }
  

  loadRecipes() {
    this.recipeService
      .getAllRecipes(this.currentPage, this.pageSize)
      .subscribe((response) => {
        this.recipes = response.data;
        this.filteredRecipes = response.data;
        this.totalPages = response.totalPages;
      });
    this.selectedCategory = '';
  }

  addRecipe(): void {
    this.recipeService.addRecipes(this.newRecipeForm.value, this.userId).subscribe((res) => {
      alert(res.message);
    })
    this.isAddingRecipe = false;
  }

  viewAllRecipes(): void {
    this.isAllRecipeActive = true;
    this.filteredRecipes = this.recipes;
  }

  viewUserRecipes(): void {
    this.isAllRecipeActive = false;
    this.recipeService.getRecipesByUser(this.userId).subscribe((res) => {
      this.filteredRecipes = res;
    })
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadRecipes();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadRecipes();
    }
  }
}
