import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTraspasosAdminComponent } from './view-traspasos-admin.component';

describe('ViewTraspasosAdminComponent', () => {
  let component: ViewTraspasosAdminComponent;
  let fixture: ComponentFixture<ViewTraspasosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTraspasosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTraspasosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
