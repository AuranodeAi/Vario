import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUnavailable } from './page-unavailable';

describe('PageUnavailable', () => {
  let component: PageUnavailable;
  let fixture: ComponentFixture<PageUnavailable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageUnavailable],
    }).compileComponents();

    fixture = TestBed.createComponent(PageUnavailable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
