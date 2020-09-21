import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form: FormGroup

  public constructor(
    builder: FormBuilder,
  ) {
    this.form = builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  public login() {
    console.log("Logging in!")
  }

}
