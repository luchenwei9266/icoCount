import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoInfoComponent } from './ico-info.component';

describe('IcoInfoComponent', () => {
  let component: IcoInfoComponent;
  let fixture: ComponentFixture<IcoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
