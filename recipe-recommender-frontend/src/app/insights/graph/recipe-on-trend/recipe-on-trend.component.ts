import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-recipe-on-trend',
  standalone: true,
  imports: [],
  templateUrl: './recipe-on-trend.component.html',
  styleUrl: './recipe-on-trend.component.css',
})
export class RecipeOnTrendComponent {
  recipeTrends = [
    { name: 'Pasta', date: '2024-01-01', views: 100, favorites: 20 },
    { name: 'Pasta', date: '2024-01-10', views: 250, favorites: 50 },
    { name: 'Pasta', date: '2024-01-20', views: 400, favorites: 80 },

    { name: 'Burger', date: '2024-01-01', views: 120, favorites: 30 },
    { name: 'Burger', date: '2024-01-10', views: 300, favorites: 70 },
    { name: 'Burger', date: '2024-01-20', views: 600, favorites: 120 },

    { name: 'Pizza', date: '2024-01-01', views: 80, favorites: 10 },
    { name: 'Pizza', date: '2024-01-10', views: 200, favorites: 40 },
    { name: 'Pizza', date: '2024-01-20', views: 500, favorites: 110 },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const ctx = document.getElementById(
        'trendingChart'
      ) as HTMLCanvasElement;

      if (ctx) {
        const uniqueRecipes = [
          ...new Set(this.recipeTrends.map((r) => r.name)),
        ];
        const uniqueDates = [...new Set(this.recipeTrends.map((r) => r.date))];

        const datasets = uniqueRecipes.map((recipe, index) => {
          const recipeData = this.recipeTrends.filter((r) => r.name === recipe);
          return {
            label: recipe,
            data: recipeData.map((r) => r.views), // Use views or favorites
            borderColor: this.getColor(index),
            backgroundColor: this.getColor(index, 0.2),
            tension: 0.4,
            fill: true,
          };
        });

        new Chart(ctx, {
          type: 'line',
          data: {
            labels: uniqueDates, // X-axis = Time (Date)
            datasets: datasets, // Each recipe has its own trend line
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) =>
                    `${tooltipItem.dataset.label} - Views: ${tooltipItem.raw}`,
                },
              },
            },
            scales: {
              x: { title: { display: true, text: 'Date' } },
              y: { title: { display: true, text: 'Views' }, beginAtZero: true },
            },
          },
        });
      }
    }
  }

  getColor(index: number, alpha: number = 1): string {
    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#a855f7'];
    return (
      colors[index % colors.length] +
      (alpha < 1 ? `${Math.floor(alpha * 255).toString(16)}` : '')
    );
  }
}
