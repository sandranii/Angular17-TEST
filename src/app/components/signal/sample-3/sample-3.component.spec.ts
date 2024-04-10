import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sample3Component } from './sample-3.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Sample3Component', () => {
  let component: Sample3Component;
  let fixture: ComponentFixture<Sample3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sample3Component, HttpClientTestingModule], //導入HttpClientTestingModule
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Sample3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
