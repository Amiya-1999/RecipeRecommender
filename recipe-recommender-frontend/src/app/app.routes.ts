import { Routes } from '@angular/router';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { LoginComponent } from './components/login/login.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipeListComponent },
    { path: 'recipes/:id', component: RecipeDetailsComponent },
    { path: 'favorites', component: FavoriteListComponent },
    { path: 'login', component: LoginComponent },
];
