import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasxmenuComponent } from './mesasxmenu.component';

describe('MesasxmenuComponent', () => {
  let component: MesasxmenuComponent;
  let fixture: ComponentFixture<MesasxmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesasxmenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesasxmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
