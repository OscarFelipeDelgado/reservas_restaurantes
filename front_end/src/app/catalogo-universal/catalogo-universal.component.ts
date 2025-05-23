import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router'; 

@Component({
  selector: 'app-catalogo-universal',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgFor],
  templateUrl: './catalogo-universal.component.html',
  styleUrl: './catalogo-universal.component.css'
})
export class CatalogoUniversalComponent {

}
