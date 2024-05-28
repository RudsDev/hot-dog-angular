import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsBaseBadgeComponent } from './promotions-base-badge.component';

describe('PromotionsBaseBadgeComponent', () => {
  let component: PromotionsBaseBadgeComponent;
  let fixture: ComponentFixture<PromotionsBaseBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromotionsBaseBadgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromotionsBaseBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
