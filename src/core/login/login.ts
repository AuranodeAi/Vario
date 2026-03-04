import { Component } from '@angular/core';
import { Dashboard } from '../dashboard/dashboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login  {
 
  constructor(private router: Router) {}
  ngOninit(){
  }

  signIn() {
      this.router.navigate(['/dashboard']);
  }
}
