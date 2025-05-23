import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoUniversalComponent } from './catalogo-universal.component';

describe('CatalogoUniversalComponent', () => {
  let component: CatalogoUniversalComponent;
  let fixture: ComponentFixture<CatalogoUniversalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoUniversalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoUniversalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
