import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotDogsHomeComponent } from './hot-dogs-home.component';

describe('HotDogsHomeComponent', () => {
  let component: HotDogsHomeComponent;
  let fixture: ComponentFixture<HotDogsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotDogsHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotDogsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
