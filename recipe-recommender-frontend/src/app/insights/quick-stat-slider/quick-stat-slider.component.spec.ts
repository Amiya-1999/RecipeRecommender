import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickStatSliderComponent } from './quick-stat-slider.component';

describe('QuickStatSliderComponent', () => {
  let component: QuickStatSliderComponent;
  let fixture: ComponentFixture<QuickStatSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickStatSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuickStatSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
