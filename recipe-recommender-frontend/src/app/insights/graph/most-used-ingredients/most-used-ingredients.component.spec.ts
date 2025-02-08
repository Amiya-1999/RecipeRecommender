import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostUsedIngredientsComponent } from './most-used-ingredients.component';

describe('MostUsedIngredientsComponent', () => {
  let component: MostUsedIngredientsComponent;
  let fixture: ComponentFixture<MostUsedIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostUsedIngredientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostUsedIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
