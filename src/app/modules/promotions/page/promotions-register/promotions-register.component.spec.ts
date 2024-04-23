import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsRegisterComponent } from './promotions-register.component';

describe('PromotionsRegisterComponent', () => {
  let component: PromotionsRegisterComponent;
  let fixture: ComponentFixture<PromotionsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromotionsRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromotionsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
