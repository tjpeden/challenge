import { Component } from '@angular/core';

/**
 * Leave the root component empty so we can have different layouts for different
 * types of pages (e.g. login/registration/etc vs main app layout)
**/
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent { }
