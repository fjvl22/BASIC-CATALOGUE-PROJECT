import { CurrencyPipe, registerLocaleData } from "@angular/common";
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";

import { PricePipe } from './price.pipe';

registerLocaleData(localeEs);

describe('PricePipe', () => {
  let pipe: PricePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PricePipe,
        CurrencyPipe,
        { provide: LOCALE_ID, useValue: 'es-ES' },
      ],
    });

    pipe = TestBed.inject(PricePipe);
  });

  it('formats a price as euros using Spanish formatting', () => {
    const result = pipe.transform(1234.5);

    expect(result).toContain('1.234,50');
    expect(result).toContain('€');
  });

  it('formats zero as currency', () => {
    const result = pipe.transform(0);

    expect(result).toContain('0,00');
    expect(result).toContain('€');
  });

  it('formats a decimal price with two decimal places', () => {
    const result = pipe.transform(9.9);

    expect(result).toContain('9,90');
    expect(result).toContain('€');
  });
});