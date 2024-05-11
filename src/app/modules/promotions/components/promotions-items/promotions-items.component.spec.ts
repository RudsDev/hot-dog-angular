import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsItemsComponent } from './promotions-items.component';

describe('PromotionsItemsComponent', () => {
  let component: PromotionsItemsComponent;
  let fixture: ComponentFixture<PromotionsItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromotionsItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromotionsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
