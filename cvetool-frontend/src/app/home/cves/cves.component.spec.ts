import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CVEsComponent } from './cves.component';

describe('CVEsComponent', () => {
  let component: CVEsComponent;
  let fixture: ComponentFixture<CVEsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CVEsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CVEsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
