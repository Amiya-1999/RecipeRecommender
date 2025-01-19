import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  recipes: any[] = [];
  filteredRecipes: any[] = [];
  selectedCategory: string = '';
  searchText: string = '';
  currentPage = 1;
  totalPages = 1;
  pageSize = 6;
  isLoggedIn: boolean = false;

  constructor(private recipeService: RecipeService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadRecipes();
    this.userService.isLoggedIn().subscribe((data) => {
      this.isLoggedIn = data;
    })
  }

  viewDetails(recipeId: string): void {
    if(this.isLoggedIn) {
      this.router.navigate(['/recipes', recipeId])
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
