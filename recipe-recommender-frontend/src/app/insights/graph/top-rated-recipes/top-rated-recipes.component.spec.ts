import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedRecipesComponent } from './top-rated-recipes.component';

describe('TopRatedRecipesComponent', () => {
  let component: TopRatedRecipesComponent;
  let fixture: ComponentFixture<TopRatedRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRatedRecipesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopRatedRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
