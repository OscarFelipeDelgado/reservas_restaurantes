import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgFor } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DiuHoyService } from '../diu-hoy-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo-universal',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgFor, CommonModule, ReactiveFormsModule],
  templateUrl: './catalogo-universal.component.html',
  styleUrls: ['./catalogo-universal.component.css']
})
export class CatalogoUniversalComponent implements OnInit {

  title = "MANEJO DE CATALOGO UNIVERSAL";

  // Listado general
  tituloCataUniLista = "";
  CataUniT: any[] = [];
  tablacatalogosstotales: string[] = [];
  controlLista1: boolean = false;

  // Formulario para filtro tipo catálogo
  CBCatalogoCatalogo: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private servi: DiuHoyService,
  ) {
    this.CBCatalogoCatalogo = this.formBuilder.group({
      CatCatalogofiltro: ['']
    });
  }

  ngOnInit(): void {
    this.consultaCatalogosTotales();
  }

  public consultaCatalogosTotales() {
    this.servi.getCatalogoTotal()
      .then((data) => {
        console.log('Datos recibidos:', data);
        this.CataUniT = data.data; // Asegúrate que data.data es un array
        this.tituloCataUniLista = "LISTA DE TODOS LOS CATALOGOS";
        this.tablacatalogosstotales = ["Id", "Denominación", "LLaveForanea"];
        this.controlLista1 = true;
      })
      .catch(error => {
        console.error("Error al obtener catalogos totales:", error);
      });
  }

  public LimpiarLista1() {
    this.controlLista1 = false;
    this.CataUniT = [];
  }

}
