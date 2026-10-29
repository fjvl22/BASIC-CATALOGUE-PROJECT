import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the application', () => {
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display the store brand', () => {
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();

    const brand = fixture.nativeElement.querySelector('.brand');

    expect(brand).toBeTruthy();
    expect(brand.textContent).toContain('modern');
    expect(brand.textContent).toContain('store');
  });
});