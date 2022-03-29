import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarIndicadorComponent } from './agregar-indicador.component';

describe('AgregarIndicadorComponent', () => {
  let component: AgregarIndicadorComponent;
  let fixture: ComponentFixture<AgregarIndicadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarIndicadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarIndicadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
