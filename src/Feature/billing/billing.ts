import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-billing',
  imports: [ButtonModule],
  templateUrl: './billing.html',
  styleUrl: './billing.css',
})


export class Billing {
billObject : any  = {

};
  constructor(){}


}
