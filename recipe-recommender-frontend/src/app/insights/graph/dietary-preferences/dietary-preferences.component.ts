import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dietary-preferences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dietary-preferences.component.html',
  styleUrl: './dietary-preferences.component.css',
})
export class DietaryPreferencesComponent implements AfterViewInit {
  availableDiet = [
    { name: 'Vegetarian', totalRecipe: 80 },
    { name: 'Vegan', totalRecipe: 30 },
    { name: 'Non-Vegetarian', totalRecipe: 130 },
  ];

  constructor() {}

  ngAfterViewInit() {
    const ctx = document.getElementById('dietaryChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: this.availableDiet.map((d) => d.name),
          datasets: [
            {
              data: this.availableDiet.map((d) => d.totalRecipe),
              backgroundColor: ['#4f46e5', '#ec4899', '#10b981'],
              borderColor: '#ffffff',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const total = (tooltipItem.dataset.data as number[]).reduce(
                    (sum, val) => sum + val,
                    0
                  );
                  const value = tooltipItem.raw as number;
                  const percentage = ((value / total) * 100).toFixed(2) + '%';
                  return `${tooltipItem.label}: ${value} recipes (${percentage})`;
                },
              },
            },
            datalabels: {
              color: '#ffffff',
              font: { weight: 'bold', size: 14 },
              anchor: 'center',
              align: 'end',
              formatter: (value) => value,
            },
          },
        },
      });
    }
  }
}
