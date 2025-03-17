import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-cuisine-preferences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cuisine-preferences.component.html',
  styleUrl: './cuisine-preferences.component.css',
})
export class CuisinePreferencesComponent implements AfterViewInit {
  constructor() {}
  mostViewedCuisines = [
    { name: 'Italian', totalRecipe: 150 },
    { name: 'Indian', totalRecipe: 120 },
    { name: 'Mexican', totalRecipe: 100 },
    { name: 'Chinese', totalRecipe: 90 },
  ];

  ngAfterViewInit() {
    const ctx = document.getElementById('cuisineChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.mostViewedCuisines.map((c) => c.name),
          datasets: [
            {
              data: this.mostViewedCuisines.map((c) => c.totalRecipe),
              backgroundColor: ['#f43f5e', '#fb923c', '#fde047', '#10b981'],
              borderColor: '#ffffff',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          animation: { animateScale: true },
          cutout: '10%',
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
              anchor: 'end',
              align: 'start',
              formatter: (value) => value,
            },
          },
        },
      });
    }
  }
}
