import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteComponent } from './paciente.component';

describe('PacienteComponent', () => {
  let component: PacienteComponent;
  let fixture: ComponentFixture<PacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
