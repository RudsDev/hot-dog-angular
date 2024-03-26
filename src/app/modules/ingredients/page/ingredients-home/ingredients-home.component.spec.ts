import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsHomeComponent } from './ingredients-home.component';

describe('IngredientsHomeComponent', () => {
  let component: IngredientsHomeComponent;
  let fixture: ComponentFixture<IngredientsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngredientsHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
