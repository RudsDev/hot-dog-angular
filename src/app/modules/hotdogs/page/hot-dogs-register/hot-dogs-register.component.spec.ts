import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotDogsRegisterComponent } from './hot-dogs-register.component';

describe('HotDogsRegisterComponent', () => {
  let component: HotDogsRegisterComponent;
  let fixture: ComponentFixture<HotDogsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotDogsRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotDogsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
