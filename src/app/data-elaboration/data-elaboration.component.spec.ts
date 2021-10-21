import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataElaborationComponent } from './data-elaboration.component';

describe('DataElaborationComponent', () => {
  let component: DataElaborationComponent;
  let fixture: ComponentFixture<DataElaborationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataElaborationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataElaborationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
