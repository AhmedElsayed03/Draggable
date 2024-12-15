import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResturantComponent } from './resturant.component';

describe('ResturantComponent', () => {
  let component: ResturantComponent;
  let fixture: ComponentFixture<ResturantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResturantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResturantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
