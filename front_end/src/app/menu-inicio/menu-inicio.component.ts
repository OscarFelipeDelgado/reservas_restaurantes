import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router'; 

@Component({
  selector: 'app-menu-inicio',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgFor],
  templateUrl: './menu-inicio.component.html',
  styleUrl: './menu-inicio.component.css'
})
export class MenuInicioComponent {

}
