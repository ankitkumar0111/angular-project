import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReceiverComponent } from './my-receiver.component';
import { ReceiverService } from '../receiver.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('MyReceiverComponent', () => {
  let component: MyReceiverComponent;
  let fixture: ComponentFixture<MyReceiverComponent>;
  let receiverService: ReceiverService;

  const receiverServiceStub = {
    getReceivers: () => of([
      { id: 1, firstName: 'John', middleName: 'Doe', lastName: 'Smith' },
      { id: 2, firstName: 'Alice', middleName: 'Jane', lastName: 'Doe' }
    ]),
    deleteReceiver: () => of({}),
    // Add other methods used by the component here
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReceiverComponent ],
      imports: [RouterTestingModule],
      providers: [{ provide: ReceiverService, useValue: receiverServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReceiverComponent);
    component = fixture.componentInstance;
    receiverService = TestBed.inject(ReceiverService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load receivers on initialization', () => {
    expect(component.receivers.length).toBe(2);
    expect(component.receivers[0].firstName).toBe('John');
    expect(component.receivers[1].lastName).toBe('Doe');
  });

  it('should delete a receiver', () => {
    const receiverIdToDelete = 1;
    const initialLength = component.receivers.length;

    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(receiverService, 'deleteReceiver').and.returnValue(of({}));

    component.deleteReceiver(receiverIdToDelete);

    expect(component.receivers.length).toBe(initialLength - 1);
    expect(receiverService.deleteReceiver).toHaveBeenCalledWith(receiverIdToDelete);
  });
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
