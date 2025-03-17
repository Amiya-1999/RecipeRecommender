import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-most-popular-recipes',
  standalone: true,
  imports: [],
  templateUrl: './most-popular-recipes.component.html',
  styleUrl: './most-popular-recipes.component.css',
})
export class MostPopularRecipesComponent {
  mostPopularRecipes = [
    { name: 'Chicken Biriyani', views: 90, favorites: 40, saved: 10 },
    { name: 'Butter Chicken', views: 123, favorites: 67, saved: 17 },
    { name: 'Milk Oats', views: 111, favorites: 20, saved: 31 },
    { name: 'Thai Green Curry', views: 250, favorites: 38, saved: 81 },
    { name: 'Shakshuka', views: 50, favorites: 10, saved: 28 },
  ];

  constructor() {}

  ngAfterViewInit(): void {
    const ctx = document.getElementById(
      'mostPopularChart'
    ) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.mostPopularRecipes.map((r) => r.name),
        datasets: [
          {
            label: 'Views',
            data: this.mostPopularRecipes.map((r) => r.views),
            backgroundColor: '#ef4444',
          },
          {
            label: 'Favorites',
            data: this.mostPopularRecipes.map((r) => r.favorites),
            backgroundColor: '#f97316',
          },
          {
            label: 'Saved',
            data: this.mostPopularRecipes.map((r) => r.saved),
            backgroundColor: '#facc15',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          datalabels: {
            color: '#ffffff',
            font: { weight: 'bold', size: 14 },
            anchor: 'end',
            align: 'start',
            formatter: (value) => value,
          },
        },
      },
    });
  }
}
