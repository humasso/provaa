import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotiComponent } from './voti.component';

describe('VotiComponent', () => {
  let component: VotiComponent;
  let fixture: ComponentFixture<VotiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
