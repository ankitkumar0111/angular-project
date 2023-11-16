import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReceiverComponent } from './my-receiver.component';

describe('MyReceiverComponent', () => {
  let component: MyReceiverComponent;
  let fixture: ComponentFixture<MyReceiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReceiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
