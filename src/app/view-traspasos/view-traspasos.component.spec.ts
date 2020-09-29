import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTraspasosComponent } from './view-traspasos.component';

describe('ViewTraspasosComponent', () => {
  let component: ViewTraspasosComponent;
  let fixture: ComponentFixture<ViewTraspasosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTraspasosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTraspasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
