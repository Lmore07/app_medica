import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Administrador2Component } from './administrador2.component';

describe('Administrador2Component', () => {
  let component: Administrador2Component;
  let fixture: ComponentFixture<Administrador2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Administrador2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Administrador2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
