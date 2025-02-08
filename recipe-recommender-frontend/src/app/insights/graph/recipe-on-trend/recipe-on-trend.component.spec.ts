import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeOnTrendComponent } from './recipe-on-trend.component';

describe('RecipeOnTrendComponent', () => {
  let component: RecipeOnTrendComponent;
  let fixture: ComponentFixture<RecipeOnTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeOnTrendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeOnTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
