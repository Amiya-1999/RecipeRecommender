import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionComparisonComponent } from './nutrition-comparison.component';

describe('NutritionComparisonComponent', () => {
  let component: NutritionComparisonComponent;
  let fixture: ComponentFixture<NutritionComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionComparisonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NutritionComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
