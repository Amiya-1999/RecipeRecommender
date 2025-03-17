import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-most-used-ingredients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './most-used-ingredients.component.html',
  styleUrl: './most-used-ingredients.component.css',
})
export class MostUsedIngredientsComponent {
  constructor() {}
  topIngredients = [
    { name: 'Garlic', totalRecipeUsed: 120 },
    { name: 'Onion', totalRecipeUsed: 100 },
    { name: 'Tomato', totalRecipeUsed: 95 },
    { name: 'Chicken', totalRecipeUsed: 80 },
    { name: 'Salt', totalRecipeUsed: 75 },
  ];

  ngAfterViewInit() {
    const ctx = document.getElementById(
      'ingredientsChart'
    ) as HTMLCanvasElement;
    if (ctx) {
      // Sorting ingredients by usage count (descending)
      this.topIngredients.sort((a, b) => b.totalRecipeUsed - a.totalRecipeUsed);

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.topIngredients.map((i) => i.name),
          datasets: [
            {
              label: 'Ingredient Usage',
              data: this.topIngredients.map((i) => i.totalRecipeUsed),
              backgroundColor: [
                '#ef4444',
                '#f97316',
                '#eab308',
                '#84cc16',
                '#3b82f6',
              ],
              borderColor: '#ffffff',
              borderWidth: 2,
            },
          ],
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
              ticks: { font: { size: 14 } },
            },
            y: {
              ticks: { font: { size: 14 }, autoSkip: false },
            },
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const total = this.topIngredients.reduce(
                    (sum, ing) => sum + ing.totalRecipeUsed,
                    0
                  );
                  const value = tooltipItem.raw as number;
                  const percentage = ((value / total) * 100).toFixed(2) + '%';
                  return `${tooltipItem.label}: ${value} times (${percentage})`;
                },
              },
            },
            datalabels: {
              color: '#000000',
              font: { weight: 'bold', size: 14 },
              anchor: 'end',
              align: 'left',
              formatter: (value) => value,
            },
          },
        },
      });
    }
  }
}
