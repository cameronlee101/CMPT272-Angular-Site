import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuisanceTableComponent } from './nuisance-table.component';

describe('NuisanceTableComponent', () => {
  let component: NuisanceTableComponent;
  let fixture: ComponentFixture<NuisanceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NuisanceTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuisanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
