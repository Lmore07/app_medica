import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VercitasComponent } from './vercitas.component';

describe('VercitasComponent', () => {
  let component: VercitasComponent;
  let fixture: ComponentFixture<VercitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VercitasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VercitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
