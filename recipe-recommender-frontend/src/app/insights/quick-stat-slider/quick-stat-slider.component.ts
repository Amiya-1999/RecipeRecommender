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
import { quickStat } from '../../services/structure';
import { InsightsService } from '../../services/insights.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-quick-stat-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-stat-slider.component.html',
  styleUrl: './quick-stat-slider.component.css',
})
export class QuickStatSliderComponent {
  quickStats: quickStat[] = [
    { name: 'Total Recipes', value: '0', icon: '📌' },
    { name: 'Total Recipes Uploaded By You', value: '0', icon: '📤' },
    { name: 'Total Favorite Recipes of Yours', value: '0', icon: '❤️' },
    { name: 'Total Recipes Saved By You', value: '0', icon: '💾' },
    { name: 'Total Recipes Rated By You', value: '0', icon: '⭐' },
    { name: 'Total Recipes Viewed By You', value: '0', icon: '👀' },
    { name: 'Most Popular Cuisine', value: 'Unknown', icon: '🍛' },
    {
      name: 'Most Popular Dietary Preference',
      value: 'Unknown',
      icon: '🍗',
    },
    {
      name: 'Total Cooking Time of All Available Recipes',
      value: '0h 0m',
      icon: '⏰',
    },
    {
      name: 'Average Cooking Time of All Available Recipes',
      value: '0',
      icon: '⏳',
    },
    { name: 'Total Ingredients Used', value: '0', icon: '🥦' },
    { name: 'Most Used Ingredient', value: 'Unknown', icon: '🍅' },
    {
      name: 'Highest Rated Recipe',
      value: 'Unknown',
      icon: '🏆',
    },
    { name: 'Lowest Rated Recipe', value: 'Unknown', icon: '⚠️' },
  ];

  extendedStats = [...this.quickStats];
  @ViewChild('statsContainer') statsContainer!: ElementRef;

  private scrollInterval: any;
  private currentIndex: number = 0;
  itemsPerView: number = 3;
  isHovered: boolean = false;
  totalItems: number = 0;
  userId: string | null = '';

  constructor(
    private renderer: Renderer2,
    private insightsService: InsightsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserId().subscribe((res) => {
      this.userId = res;
    });
    this.insightsService.getAllQuickStats(this.userId).subscribe((data) => {
      this.updateQuickStatValues(data);
    });

    this.updateItemsPerView();
    this.duplicateItems();
    setTimeout(() => this.startAutoScroll(), 0);
  }

  updateQuickStatValues(stats: any): void {
    this.quickStats[0].value = stats.totalRecipe;
    this.quickStats[1].value = stats.totalRecipesUploadedByUser;
    this.quickStats[2].value = stats.totalFavouriteRecipesOfUser;
    this.quickStats[3].value = stats.totalRecipesSavedByUser;
    this.quickStats[4].value = stats.totalRecipesRatedByUser;
    this.quickStats[5].value = stats.totalRecipesViewedByUser;
    this.quickStats[6].value = stats.mostPopularCuisine.join(', ');
    this.quickStats[7].value = stats.mostPopularDietaryType.join(', ');
    this.quickStats[8].value = stats.totalCookingTime;
    this.quickStats[9].value = stats.avgCookingTime + 'min';
    this.quickStats[10].value = stats.totalUsedIngredients;
    this.quickStats[11].value = stats.mostUsedIngredients.join(', ');
    this.quickStats[12].value = stats.highestRatedRecipes
      .map((recipe: any) => {
        return `${recipe.recipe_name}(${recipe.avg_rating})`;
      })
      .join(', ');
    this.quickStats[13].value = stats.lowestRatedRecipes
      .map((recipe: any) => {
        return `${recipe.recipe_name}(${recipe.avg_rating})`;
      })
      .join(', ');
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
