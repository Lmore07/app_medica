import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionComponent } from './opcion.component';

describe('OpcionComponent', () => {
  let component: OpcionComponent;
  let fixture: ComponentFixture<OpcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
