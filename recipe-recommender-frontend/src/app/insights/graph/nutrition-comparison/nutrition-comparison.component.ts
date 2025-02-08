import { Component, Inject, PLATFORM_ID } from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, registerables } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-nutrition-comparison',
  standalone: true,
  imports: [],
  templateUrl: './nutrition-comparison.component.html',
  styleUrl: './nutrition-comparison.component.css',
})
export class NutritionComparisonComponent {
  nutritionComparison = [
    { cuisine: 'Indian', calories: 800, protein: 30, carbs: 90, fats: 40 },
    { cuisine: 'Italian', calories: 700, protein: 25, carbs: 85, fats: 35 },
    { cuisine: 'Chinese', calories: 650, protein: 28, carbs: 80, fats: 30 },
    { cuisine: 'Mexican', calories: 750, protein: 32, carbs: 88, fats: 38 },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const ctx = document.getElementById(
        'nutritionChart'
      ) as HTMLCanvasElement;
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.nutritionComparison.map((c) => c.cuisine),
            datasets: [
              {
                label: 'Calories',
                data: this.nutritionComparison.map((c) => c.calories),
                backgroundColor: '#f43f5e',
              },
              {
                label: 'Protein',
                data: this.nutritionComparison.map((c) => c.protein),
                backgroundColor: '#10b981',
              },
              {
                label: 'Carbs',
                data: this.nutritionComparison.map((c) => c.carbs),
                backgroundColor: '#fbbf24',
              },
              {
                label: 'Fats',
                data: this.nutritionComparison.map((c) => c.fats),
                backgroundColor: '#6366f1',
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) =>
                    `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
                },
              },
              datalabels: {
                color: 'white',
                font: {
                  weight: 'bold',
                  size: 14,
                },
                formatter: (value) => value,
              },
            },
            scales: {
              x: { stacked: true },
              y: { stacked: true, beginAtZero: true },
            },
          },
        });
      }
    }
  }
}
