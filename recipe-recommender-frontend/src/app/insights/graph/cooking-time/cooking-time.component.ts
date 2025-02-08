import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-cooking-time',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cooking-time.component.html',
  styleUrl: './cooking-time.component.css',
})
export class CookingTimeComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}
  cookingTimeSummary = [
    { range: '0-15 min', totalRecipe: 50 },
    { range: '15-30 min', totalRecipe: 120 },
    { range: '30-45 min', totalRecipe: 80 },
    { range: '45+ min', totalRecipe: 40 },
  ];

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const ctx = document.getElementById(
        'cookingTimeChart'
      ) as HTMLCanvasElement;
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: this.cookingTimeSummary.map((c) => c.range),
            datasets: [
              {
                data: this.cookingTimeSummary.map((c) => c.totalRecipe),
                backgroundColor: ['#4f46e5', '#ec4899', '#10b981', '#f59e0b'],
                borderColor: '#ffffff',
                borderWidth: 2,
                hoverOffset: 8,
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
              // Center text plugin
              datalabels: {
                color: '#000',
                font: { weight: 'bold', size: 14 },
                formatter: (_, ctx) => {
                  return ctx.chart.data.datasets[0].label;
                },
              },
            },
            cutout: '70%',
          },
        });
      }
    }
  }
}
