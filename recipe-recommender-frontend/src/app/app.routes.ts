import { Routes } from '@angular/router';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { LoginComponent } from './components/login/login.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { RecipeInsightsComponent } from './components/recipe-insights/recipe-insights.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipeListComponent },
    { path: 'recipes/:id', component: RecipeDetailsComponent, canActivate: [authGuard] },
    { path: 'favorites', component: FavoriteListComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
    { path: 'add-recipe', component: NewRecipeComponent, canActivate: [authGuard]},
    { path: 'insights', component: RecipeInsightsComponent, canActivate: [authGuard]}
];
