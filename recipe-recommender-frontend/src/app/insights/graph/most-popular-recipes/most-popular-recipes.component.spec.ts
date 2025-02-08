import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularRecipesComponent } from './most-popular-recipes.component';

describe('MostPopularRecipesComponent', () => {
  let component: MostPopularRecipesComponent;
  let fixture: ComponentFixture<MostPopularRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostPopularRecipesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostPopularRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
