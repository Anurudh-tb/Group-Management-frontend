import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentGroupComponent } from './add-studetns.component';

describe('AddStudetnsComponent', () => {
  let component: AddStudentGroupComponent;
  let fixture: ComponentFixture<AddStudentGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStudentGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
