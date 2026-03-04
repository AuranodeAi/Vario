import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './base.html',
  styleUrl: './base.css',
})
export class Base {}
