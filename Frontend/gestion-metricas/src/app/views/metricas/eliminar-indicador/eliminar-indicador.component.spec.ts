import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarIndicadorComponent } from './eliminar-indicador.component';

describe('EliminarIndicadorComponent', () => {
  let component: EliminarIndicadorComponent;
  let fixture: ComponentFixture<EliminarIndicadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarIndicadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarIndicadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
