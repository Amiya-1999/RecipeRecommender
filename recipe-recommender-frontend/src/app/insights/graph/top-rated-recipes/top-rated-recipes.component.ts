import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-top-rated-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-rated-recipes.component.html',
  styleUrl: './top-rated-recipes.component.css',
})
export class TopRatedRecipesComponent {
  chart: any;

  topRatedRecipes = [
    {
      recipeName: 'Chicken Biriyani',
      avgRating: 4.6,
      totalUserRated: 21,
      totalReviews: 12,
    },
    {
      recipeName: 'Butter Chicken',
      avgRating: 4.4,
      totalUserRated: 15,
      totalReviews: 8,
    },
    {
      recipeName: 'Thai Green Curry',
      avgRating: 4.7,
      totalUserRated: 18,
      totalReviews: 10,
    },
    {
      recipeName: 'Milk Oats',
      avgRating: 4.6,
      totalUserRated: 25,
      totalReviews: 15,
    },
    {
      recipeName: 'Shakshuka',
      avgRating: 3.9,
      totalUserRated: 11,
      totalReviews: 5,
    },
  ];

  ngAfterViewInit() {
    this.createBarChart();
  }

  createBarChart() {
    const ctx = document.getElementById('ratingChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.topRatedRecipes.map((r) => r.recipeName),
        datasets: [
          {
            label: 'Average Rating',
            data: this.topRatedRecipes.map((r) => r.avgRating),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Total Users Rated',
            data: this.topRatedRecipes.map((r) => r.totalUserRated),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Total Reviews',
            data: this.topRatedRecipes.map((r) => r.totalReviews),
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } },
    });
  }
}
