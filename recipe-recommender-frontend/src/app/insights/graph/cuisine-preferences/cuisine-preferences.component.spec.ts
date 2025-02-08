import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisinePreferencesComponent } from './cuisine-preferences.component';

describe('CuisinePreferencesComponent', () => {
  let component: CuisinePreferencesComponent;
  let fixture: ComponentFixture<CuisinePreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuisinePreferencesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuisinePreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
