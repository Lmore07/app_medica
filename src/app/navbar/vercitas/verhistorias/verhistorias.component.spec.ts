import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerhistoriasComponent } from './verhistorias.component';

describe('VerhistoriasComponent', () => {
  let component: VerhistoriasComponent;
  let fixture: ComponentFixture<VerhistoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerhistoriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerhistoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
