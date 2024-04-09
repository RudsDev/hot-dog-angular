import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotDogsFormComponent } from './hot-dogs-form.component';

describe('HotDogsFormComponent', () => {
  let component: HotDogsFormComponent;
  let fixture: ComponentFixture<HotDogsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotDogsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotDogsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
