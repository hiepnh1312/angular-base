import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpPasswordDialogComponent } from './otp-password-dialog.component';

describe('OtpPasswordDialogComponent', () => {
  let component: OtpPasswordDialogComponent;
  let fixture: ComponentFixture<OtpPasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpPasswordDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
