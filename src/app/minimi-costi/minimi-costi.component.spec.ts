import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimiCostiComponent } from './minimi-costi.component';

describe('MinimiCostiComponent', () => {
  let component: MinimiCostiComponent;
  let fixture: ComponentFixture<MinimiCostiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinimiCostiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimiCostiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
