import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeActivityComponent } from './recipe-activity.component';

describe('RecipeActivityComponent', () => {
  let component: RecipeActivityComponent;
  let fixture: ComponentFixture<RecipeActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
