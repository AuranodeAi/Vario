import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {
  constructor(){

  }
  dashboardTools = [
    { id: 1, title: 'Point of Sale', icon: 'pi pi-shopping-cart', desc: 'Create new bills and invoices', route: '/toolboard' },
    { id: 2, title: 'Inventory', icon: 'pi pi-box', desc: 'Manage stock levels and products', route: '/stock' },
    { id: 3, title: 'Reports', icon: 'pi pi-chart-line', desc: 'View sales and stock analytics', route: '/reports' },
    { id: 4, title: 'Customers', icon: 'pi pi-users', desc: 'Manage customer directory', route: '/customers' },
    { id: 5, title: 'Suppliers', icon: 'pi pi-truck', desc: 'Manage vendors and purchase orders', route: '/suppliers' },
    { id: 6, title: 'Settings', icon: 'pi pi-cog', desc: 'System configuration and users', route: '/settings' }
  ];

  trackById(_: number, item: any) {
    return item && item.id;
  }
}
