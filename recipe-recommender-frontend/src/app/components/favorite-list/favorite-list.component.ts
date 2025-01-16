import { Component } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.css'
})
export class FavoriteListComponent {
  favorites: any[] = [];
  userId: string = "1";

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteService.getFavorites(this.userId).subscribe((favorites) => {
      this.favorites = favorites;
    });
  }

  removeFavorite(recipeId: string): void {
    this.favoriteService.removeFavorite(this.userId, recipeId).subscribe((data) => {
      alert(data.message)
      this.favorites = this.favorites.filter((fav) => fav.id !== recipeId);
    });
  }

}
