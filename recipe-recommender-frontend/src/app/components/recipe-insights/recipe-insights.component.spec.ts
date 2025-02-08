import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeInsightsComponent } from './recipe-insights.component';

describe('RecipeInsightsComponent', () => {
  let component: RecipeInsightsComponent;
  let fixture: ComponentFixture<RecipeInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeInsightsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
