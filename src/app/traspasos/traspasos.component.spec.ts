import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraspasosComponent } from './traspasos.component';

describe('TraspasosComponent', () => {
  let component: TraspasosComponent;
  let fixture: ComponentFixture<TraspasosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraspasosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraspasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
