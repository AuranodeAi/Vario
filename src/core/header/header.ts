import { Component, HostListener,ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
isMenuOpen = false;
// You must inject ElementRef here
  constructor(private el: ElementRef) {}
toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

// Optional: Close when clicking outside
@HostListener('document:click', ['$event'])
clickout(event: any) {
  if (!this.el.nativeElement.contains(event.target)) {
    this.isMenuOpen = false;
  }
}
}