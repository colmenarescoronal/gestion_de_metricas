import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricasLayoutComponent } from './metricas-layout.component';

describe('MetricasLayoutComponent', () => {
  let component: MetricasLayoutComponent;
  let fixture: ComponentFixture<MetricasLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricasLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricasLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
