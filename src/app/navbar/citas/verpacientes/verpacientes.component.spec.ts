import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerpacientesComponent } from './verpacientes.component';

describe('VerpacientesComponent', () => {
  let component: VerpacientesComponent;
  let fixture: ComponentFixture<VerpacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerpacientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerpacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
