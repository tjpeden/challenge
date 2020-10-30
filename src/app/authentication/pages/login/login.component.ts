import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public form: FormGroup

  public constructor(
    builder: FormBuilder,
  ) {
    this.form = builder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  public login(): void {
    console.log('Logging in!')
  }

}
