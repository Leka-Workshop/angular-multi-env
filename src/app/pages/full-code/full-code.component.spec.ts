import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCodeComponent } from './full-code.component';

describe('FullCodeComponent', () => {
  let component: FullCodeComponent;
  let fixture: ComponentFixture<FullCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
