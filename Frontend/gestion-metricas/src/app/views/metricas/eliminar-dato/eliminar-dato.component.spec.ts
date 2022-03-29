import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarDatoComponent } from './eliminar-dato.component';

describe('EliminarDatoComponent', () => {
  let component: EliminarDatoComponent;
  let fixture: ComponentFixture<EliminarDatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarDatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarDatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
