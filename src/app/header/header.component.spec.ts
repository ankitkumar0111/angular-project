import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // it('should have initial changeHeader value as false', () => {
  //   expect(component.changeHeader).toBeTruthy();
  // });

  it('should change header content when logged in', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('someValue');
    component.ngDoCheck();
    expect(component.changeHeader).toBeFalse(); // Assuming 'someValue' implies logged in
  });

  it('should change header content when logged out', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);
    component.ngDoCheck();
    expect(component.changeHeader).toBeTrue(); // Assuming null implies logged out
  });

  it('should call logout and changeHeader to true', () => {
    spyOn(sessionStorage, 'removeItem');
    spyOn((component as any).router, 'navigate');

    component.logout();

    expect(sessionStorage.removeItem).toHaveBeenCalledWith('loggedIn');
    expect((component as any).router.navigate).toHaveBeenCalledWith(['/home']);
    expect(component.changeHeader).toBeTrue();
  });
 
});
