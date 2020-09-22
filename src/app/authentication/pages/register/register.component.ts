import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public form: FormGroup

  public constructor(
    builder: FormBuilder,
  ) {
    // TODO: add validator for `password` & `confirm` match.
    this.form = builder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      confirm: [null, Validators.required],
    })
  }

  public register() {
    console.log("Registering!")
  }

}
