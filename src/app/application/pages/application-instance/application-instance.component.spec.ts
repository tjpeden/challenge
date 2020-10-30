import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ApplicationInstanceComponent } from './application-instance.component'

describe('ApplicationInstanceComponent', () => {
  let component: ApplicationInstanceComponent
  let fixture: ComponentFixture<ApplicationInstanceComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationInstanceComponent ],
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationInstanceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
