import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPedidosAdminComponent } from './view-pedidos-admin.component';

describe('ViewPedidosAdminComponent', () => {
  let component: ViewPedidosAdminComponent;
  let fixture: ComponentFixture<ViewPedidosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPedidosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPedidosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
