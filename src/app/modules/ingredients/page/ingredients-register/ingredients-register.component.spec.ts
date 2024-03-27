import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsRegisterComponent } from './ingredients-register.component';

describe('IngredientsRegisterComponent', () => {
  let component: IngredientsRegisterComponent;
  let fixture: ComponentFixture<IngredientsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngredientsRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
