import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotdogsTableComponent } from './hotdogs-table.component';

describe('HotdogsTableComponent', () => {
  let component: HotdogsTableComponent;
  let fixture: ComponentFixture<HotdogsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotdogsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotdogsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
