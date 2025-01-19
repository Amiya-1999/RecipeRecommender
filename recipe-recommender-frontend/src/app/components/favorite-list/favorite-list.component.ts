import { Component } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-favorite-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.css'
})
export class FavoriteListComponent {
  favorites: any[] = [];

  constructor(private favoriteService: FavoriteService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteService.getFavorites(this.userService.userId).subscribe((favorites) => {
      this.favorites = favorites;
    });
  }

  removeFavorite(recipeId: string): void {
    this.favoriteService.removeFavorite(this.userService.userId, recipeId).subscribe((data) => {
      alert(data.message)
      this.favorites = this.favorites.filter((fav) => fav.id !== recipeId);
    });
  }

}
