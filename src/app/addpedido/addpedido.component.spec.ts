import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpedidoComponent } from './addpedido.component';

describe('AddpedidoComponent', () => {
  let component: AddpedidoComponent;
  let fixture: ComponentFixture<AddpedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
