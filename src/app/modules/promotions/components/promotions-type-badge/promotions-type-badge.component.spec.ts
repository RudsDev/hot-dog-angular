import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsTypeBadgeComponent } from './promotions-type-badge.component';

describe('PromotionsTypeBadgeComponent', () => {
  let component: PromotionsTypeBadgeComponent;
  let fixture: ComponentFixture<PromotionsTypeBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromotionsTypeBadgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromotionsTypeBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
