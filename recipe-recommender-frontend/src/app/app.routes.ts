import { Routes } from '@angular/router';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { LoginComponent } from './components/login/login.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { RecipeInsightsComponent } from './components/recipe-insights/recipe-insights.component';

export const routes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipeListComponent },
    { path: 'recipes/:id', component: RecipeDetailsComponent },
    { path: 'favorites', component: FavoriteListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent},
    { path: 'add-recipe', component: NewRecipeComponent},
    { path: 'insights', component: RecipeInsightsComponent}
];
