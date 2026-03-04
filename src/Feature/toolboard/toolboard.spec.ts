import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Toolboard } from './toolboard';

describe('Toolboard', () => {
  let component: Toolboard;
  let fixture: ComponentFixture<Toolboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toolboard],
    }).compileComponents();

    fixture = TestBed.createComponent(Toolboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
