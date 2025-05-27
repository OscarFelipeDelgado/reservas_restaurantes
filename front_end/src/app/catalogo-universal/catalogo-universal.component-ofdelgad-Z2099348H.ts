import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DiuHoyService } from '../diu-hoy-service.service';

@Component({
  selector: 'app-catalogo-universal',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgFor, CommonModule, ReactiveFormsModule],
  templateUrl: './catalogo-universal.component.html',
  styleUrl: './catalogo-universal.component.css'
})
export class CatalogoUniversalComponent implements OnInit {

  title = "CATÁLOGO UNIVERSAL";

  // Listado general
  tituloCataUniLista = "";
  CataUniT: any[] = [];
  tablacatalogosstotales: string[] = [];
  controlLista1: boolean = false;

  // Variables para tipo de catálogo
  titloCataUniTipo = "";
  CataUniTipo: any[] = [];
  ListaTipos: any[] = [];
  tablaTipoCatalogo: string[] = [];
  controlLista2: boolean = false;

  // Formularios
  CBCatalogoCatalogo!: FormGroup;
  ListarCatTotales = new FormGroup({
    Listaa: new FormControl()
  });

  constructor(
    private formBuilder: FormBuilder,
    private servi: DiuHoyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.CBCatalogoCatalogo = this.formBuilder.group({
      CatCatalogofiltro: []
    });
  }

  // Obtener todos los catálogos
  public consultaCatalogosTotales(): void {
    this.controlLista1 = false;
    this.servi.getCatalogoTotal().then((data) => {
      console.log("Datos recibidos:", data);
      this.CataUniT = data.data;
      this.tituloCataUniLista = "LISTA DE TODOS LOS CATALOGOS";
      this.tablacatalogosstotales = ["Id", "Denominación", "Tipo Catálogo"];
      this.controlLista1 = true;
    }).catch(error => console.error("Error en getCatalogoTotal:", error));
  }

  public LimpiarLista1(): void {
    this.controlLista1 = false;
    this.CataUniT = [];
  }

  public LimpiarLista2(): void {
    this.controlLista2 = false;
    this.CataUniTipo = [];
  }

  // Obtener lista de tipos de catálogo (para el combo)
  public ListarTiposCatalogos(): void {
    this.servi.getlListCatologos().then((data) => {
      this.ListaTipos = data.data;
    }).catch(error => console.error("Error en getlListCatologos:", error));
  }

  // Obtener un tipo específico de catálogo
  public ListarCatalogoE(): void {
    const valorTipoCat = this.CBCatalogoCatalogo.getRawValue()['CatCatalogofiltro'];
    this.controlLista2 = false;
    this.servi.getlListCatologoEsp('/' + valorTipoCat).then((data) => {
      this.CataUniTipo = data.data;
      console.log("Listado específico:", this.CataUniTipo);
      this.titloCataUniTipo = "LISTA DEL CATALOGO DE " + valorTipoCat;
      this.tablaTipoCatalogo = ["Id", "Denominación"];
      this.controlLista2 = true;
    }).catch(error => console.error("Error en getlListCatologoEsp:", error));
  }
}