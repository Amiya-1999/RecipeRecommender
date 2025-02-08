import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CuisinePreferencesComponent } from '../../insights/graph/cuisine-preferences/cuisine-preferences.component';
import { DietaryPreferencesComponent } from '../../insights/graph/dietary-preferences/dietary-preferences.component';
import { CookingTimeComponent } from '../../insights/graph/cooking-time/cooking-time.component';
import { MostUsedIngredientsComponent } from '../../insights/graph/most-used-ingredients/most-used-ingredients.component';
import { TopRatedRecipesComponent } from '../../insights/graph/top-rated-recipes/top-rated-recipes.component';
import { CommonModule } from '@angular/common';
import { QuickStatSliderComponent } from '../../insights/quick-stat-slider/quick-stat-slider.component';
import { MostPopularRecipesComponent } from '../../insights/graph/most-popular-recipes/most-popular-recipes.component';
import { NutritionComparisonComponent } from '../../insights/graph/nutrition-comparison/nutrition-comparison.component';
import { RecipeOnTrendComponent } from '../../insights/graph/recipe-on-trend/recipe-on-trend.component';
import { RecipeActivityComponent } from '../../insights/recipe-activity/recipe-activity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-insights',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CuisinePreferencesComponent,
    DietaryPreferencesComponent,
    CookingTimeComponent,
    MostPopularRecipesComponent,
    MostUsedIngredientsComponent,
    TopRatedRecipesComponent,
    QuickStatSliderComponent,
    NutritionComparisonComponent,
    RecipeOnTrendComponent,
    RecipeActivityComponent,
  ],
  templateUrl: './recipe-insights.component.html',
  styleUrl: './recipe-insights.component.css',
})
export class RecipeInsightsComponent {
  activeTab = 0;
  graphs = [
    { label: 'Recipes On Trend' },
    { label: 'Most Searched Recipes' },
    { label: 'Most Used Ingredients' },
    { label: 'Top Rated Recipes' },
    { label: 'Cuisine Preferences' },
    { label: 'Dietary Preferences' },
    { label: 'Cooking Time Distribution' },
    { label: 'Nutrition Comparison' },
  ];

  @ViewChild('tabContainer', { static: false }) tabContainer!: ElementRef;

  scrollTabs(direction: 'left' | 'right') {
    const container = this.tabContainer.nativeElement;
    const tabWidth = container.firstElementChild.offsetWidth;

    if (direction === 'right' && this.activeTab < this.graphs.length - 1) {
      this.activeTab++;
    } else if (direction === 'left' && this.activeTab > 0) {
      this.activeTab--;
    }

    const scrollPosition = this.activeTab * tabWidth;

    container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  }
}
