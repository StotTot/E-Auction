import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { EpochPipe } from 'src/app/pipes/epoch.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainviewComponent } from './mainview.component';

describe('MainviewComponent', () => {
  let component: MainviewComponent;
  let fixture: ComponentFixture<MainviewComponent>;
  let http: HttpClient
  let httpController: HttpTestingController
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainviewComponent, EpochPipe ],
      imports: [ HttpClientTestingModule, OverlayModule, BrowserAnimationsModule ],
      providers: [ MatSnackBar ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
