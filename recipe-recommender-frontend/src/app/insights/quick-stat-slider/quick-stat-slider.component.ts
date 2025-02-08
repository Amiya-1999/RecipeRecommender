import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-quick-stat-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-stat-slider.component.html',
  styleUrl: './quick-stat-slider.component.css',
})
export class QuickStatSliderComponent {
  quickStats = [
    { name: 'Total Recipes', value: '31', icon: '📌' },
    { name: 'Recipes Uploaded By You', value: '5', icon: '📤' },
    { name: 'Favorite Recipes', value: '8', icon: '❤️' },
    { name: 'Total Recipes Rated', value: '5', icon: '⭐' },
    { name: 'Total Recipes Viewed', value: '12', icon: '👀' },
    { name: 'Most Popular Cuisine', value: 'Indian', icon: '🍛' },
    { name: 'Average Cooking Time (min)', value: '24', icon: '⏳' },
    { name: 'Total Ingredients Used', value: '50', icon: '🥦' },
    { name: 'Most Used Ingredient', value: 'Tomato', icon: '🍅' },
    {
      name: 'Most Popular Dietary Preference',
      value: 'Non-Vegetarian',
      icon: '🍗',
    },
    {
      name: 'Highest Rated Recipe',
      value: 'Thai Green Curry (4.7)',
      icon: '🏆',
    },
    { name: 'Lowest Rated Recipe', value: 'Shakshuka (3.9)', icon: '⚠️' },
    { name: 'Total Cooking Hours', value: '12h 45m', icon: '⏰' },
    { name: 'Most Active Day for Cooking', value: 'Sunday', icon: '📅' },
  ];

  extendedStats = [...this.quickStats];
  @ViewChild('statsContainer') statsContainer!: ElementRef;

  private scrollInterval: any;
  private currentIndex: number = 0;
  itemsPerView: number = 3;
  isHovered: boolean = false;
  totalItems: number = 0;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateItemsPerView();
      this.duplicateItems();
      setTimeout(() => this.startAutoScroll(), 0);
    }
  }

  @HostListener('window:resize')
  updateItemsPerView(): void {
    const width = window.innerWidth;
    if (width < 640) {
      this.itemsPerView = 1;
    } else if (width < 1024) {
      this.itemsPerView = 2;
    } else {
      this.itemsPerView = 3;
    }
    this.duplicateItems();
  }

  duplicateItems(): void {
    this.extendedStats = [
      ...this.quickStats,
      ...this.quickStats.slice(0, this.itemsPerView),
    ];
    this.totalItems = this.extendedStats.length;
  }

  startAutoScroll(): void {
    this.clearAutoScroll();
    this.scrollInterval = setInterval(() => {
      if (!this.statsContainer || this.isHovered) return;
      this.scrollRight();
    }, 3000);
  }

  clearAutoScroll(): void {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  }

  onHover(): void {
    this.isHovered = true;
    this.clearAutoScroll();
  }

  onLeave(): void {
    this.isHovered = false;
    this.startAutoScroll();
  }

  scrollLeft(): void {
    if (this.currentIndex === 0) {
      this.currentIndex = this.quickStats.length;
      this.setTransform(false);
    }

    setTimeout(() => {
      this.currentIndex--;
      this.setTransform();
    }, 10);
  }

  scrollRight(): void {
    this.currentIndex++;
    this.setTransform();

    if (this.currentIndex >= this.quickStats.length) {
      setTimeout(() => {
        this.currentIndex = 0;
        this.setTransform(false);
      }, 1000);
    }
  }

  setTransform(smooth = true): void {
    const itemWidth = 100 / this.itemsPerView;
    this.renderer.setStyle(
      this.statsContainer.nativeElement,
      'transition',
      smooth ? 'transform 0.5s ease-in-out' : 'none'
    );
    this.renderer.setStyle(
      this.statsContainer.nativeElement,
      'transform',
      `translateX(-${this.currentIndex * itemWidth}%)`
    );
  }

  ngOnDestroy(): void {
    this.clearAutoScroll();
  }
}
