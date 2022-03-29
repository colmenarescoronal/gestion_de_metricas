import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDatoComponent } from './agregar-dato.component';

describe('AgregarDatoComponent', () => {
  let component: AgregarDatoComponent;
  let fixture: ComponentFixture<AgregarDatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarDatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
