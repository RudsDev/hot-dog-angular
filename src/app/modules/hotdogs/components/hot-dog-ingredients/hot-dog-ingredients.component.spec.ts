import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotDogIngredientsComponent } from './hot-dog-ingredients.component';

describe('HotDogIngredientsComponent', () => {
  let component: HotDogIngredientsComponent;
  let fixture: ComponentFixture<HotDogIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotDogIngredientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotDogIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
