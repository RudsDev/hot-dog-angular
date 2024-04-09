import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNumberBtnComponent } from './input-number-btn.component';

describe('InputNumberBtnComponent', () => {
  let component: InputNumberBtnComponent;
  let fixture: ComponentFixture<InputNumberBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputNumberBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputNumberBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
