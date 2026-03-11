import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolboard',
  imports: [RouterModule,CommonModule],
  templateUrl: './toolboard.html',
  styleUrl: './toolboard.css',
})
export class Toolboard {
  constructor(){

  }
  isSidebarOpen = true;

  // Dynamically set based on the tool the user opened
  currentToolName = 'Inventory'; 

  // The specific components/pages inside the Inventory tool
  currentToolMenus = [
    { id: 1, label: 'Billing', icon: 'pi pi-receipt', route: 'toolboard/Billing' },
    { id: 2, label: 'Categories', icon: 'pi pi-tags', route: 'toolboard/Category' },
    { id: 3, label: 'Stock Adjustments', icon: 'pi pi-sort-alt', route: '/stock/adjust' },
    { id: 4, label: 'Warehouses', icon: 'pi pi-building', route: '/stock/warehouses' }
  ];

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  trackById(_: number, item: any) {
    return item && item.id;
  }
}
