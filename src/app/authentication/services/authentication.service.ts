import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: string

  public constructor() {
    this.token = null
  }

  public login(
    username: string,
    password: string,
  ) {
  }

  public logout() {
    this.token = null
  }

  public isAuthenticated(): boolean {
    return this.token != null
  }

}
