import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultformComponent } from './resultform.component';

describe('ResultformComponent', () => {
  let component: ResultformComponent;
  let fixture: ComponentFixture<ResultformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
