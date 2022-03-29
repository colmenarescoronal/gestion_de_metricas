import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDatoComponent } from './editar-dato.component';

describe('EditarDatoComponent', () => {
  let component: EditarDatoComponent;
  let fixture: ComponentFixture<EditarDatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarDatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
