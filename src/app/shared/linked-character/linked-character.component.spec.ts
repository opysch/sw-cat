import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedCharacterComponent } from './linked-character.component';

describe('LinkedCharacterComponent', () => {
  let component: LinkedCharacterComponent;
  let fixture: ComponentFixture<LinkedCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkedCharacterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
