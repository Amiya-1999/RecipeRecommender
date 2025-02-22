import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookingTimeComponent } from './cooking-time.component';

describe('CookingTimeComponent', () => {
  let component: CookingTimeComponent;
  let fixture: ComponentFixture<CookingTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookingTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CookingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
