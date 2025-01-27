import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-recipe',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css',
})
export class NewRecipeComponent {
  newRecipeForm: FormGroup;
  userId: string | null = '';

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private userService: UserService,
    private router: Router
  ) {
    this.newRecipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
      steps: ['', Validators.required],
      image_url: ['', Validators.required],
      cuisine: ['', Validators.required],
      dietary_preferences: ['', Validators.required],
      cooking_time: [0, Validators.required],
    });
  }

  ngOnInit() {
    this.userService.getUserId().subscribe((res) => {
      this.userId = res;
    });
  }

  addRecipe(): void {
    this.recipeService
      .addRecipes(this.newRecipeForm.value, this.userId)
      .subscribe((res) => {
        alert(res.message);
        this.router.navigate(['/recipes']);
      });
  }
}
