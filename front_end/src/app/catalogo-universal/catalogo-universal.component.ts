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
  valorTipoCatNombre: string = "";
  
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

    // Guardar también el nombre del tipo de catálogo seleccionado
    const tipoSeleccionado = this.ListaTipos.find(t => t.Id_Catalogo === Number(valorTipoCat));
    this.valorTipoCatNombre = tipoSeleccionado ? tipoSeleccionado.Valor_Catalogo : "";

    this.controlLista2 = false;

    this.servi.getlListCatologoEsp('/' + valorTipoCat).then((data) => {
      this.CataUniTipo = data.data;
      console.log("Listado específico:", this.CataUniTipo);
      this.titloCataUniTipo = "Lista del catálogo de " + this.valorTipoCatNombre;
      this.tablaTipoCatalogo = ["Id", "Denominación"];
      this.controlLista2 = true;
    
    }).catch(error => console.error("Error en getlListCatologoEsp:", error));
  }

  //-------------------------------------------------------------------------
  //Para insertar una nuevo catalogo

  public InsertarNuevoCatalogo()   
  {
      //variables para armar el JSON que se va a enviar al Back-End
      var datosvalo1 =  this.CrearCatalogoU.getRawValue()['textNueDenominacion']; 
      var datosvalo2 =  this.CrearCatalogoU.getRawValue()['CBTipoCatalogo'];


       console.log(" aca 236  denominacion  " + datosvalo1 + " tipo " + datosvalo2);
      //JSON armado
      var cadena = {"Denominacion": datosvalo1,
                    "TipoCatalogo":datosvalo2,
                  };
      console.log(" aca 238 " + cadena);

      //se consume el servicio
      this.servi.CrearCatalogoU(cadena).then(res =>
      {
        console.log(res)
      }).catch(err =>{
        console.log(err)
      })
      
      this.CrearCatalogoU.reset();
  }


  //--------------------------------------------------------------
  //Lista todos los catalogos para el combo de editar

  public listCataEditar() 
  {

    this.servi.getCatalogoTotalOrd().then((data) => 
      {
        this.CataUniCatalogo = data.data;
        //console.log(" aca 234 " + );
      },
        error => { console.log(error) });

    }

  //--------------------------------------------------------------
  //Consulta un catalogo por Id.
  public SelCataEditar() 
  {
  this.valorCatEdit =  this.ActCatalogoU.getRawValue()['CBCatalogoEdi'];
    
    this.servi.getlCatEdit(this.valorCatEdit ).then((data: any) => 
    {
      
      this.CataUniCataEdi = data.data;

      this.titloCataUniEditar = "CATALOGO A EDITAR";

    },
      error => { console.log(error) });

  }


  // -----------------------------------------------------------------------------------------
  // método para actualizar un catalogo .

  public ActualizarCatalogo() 
  {

      //variables para armar el JSON que se va a enviar al Back-End
      var datosvalo1 =  this.ActCatalogoU.getRawValue()['CBCatalogoEdi'];
      var datosvalo2 =  this.ActCatalogoU.getRawValue()['textNueDenominacionEdi']; 
      var datosvalo3 =  this.ActCatalogoU.getRawValue()['CBTipoCatalogoEdi'];

      
      //JSON armado
      var cadena = {"IdCataUniv":datosvalo1,
                    "Denominacion":datosvalo2,
                    "TipoCatalogo":datosvalo3
                  };

  
      //se consume el servicio
      this.servi.ActualizarCatalogoU(cadena).then(res =>
      {
        console.log(res)
      }).catch(err =>{
        console.log(err)
      })

      this.CrearCatalogoU.reset();
  }


  //=============================================================
  //LAS FUNCIONES PARA LLAMARLAS DESDE EL HTML
  //=============================================================  

  ngOnInit(): void 
  {
    this.CBCatalogoCatalogo = this.formBuilder.group(
    {
      CatCatalogofiltro: [],
    });

    this.CrearCatalogoU = this.formBuilder.group(
      {
        CBTipoCatalogo: [],
        textNueDenominacion: [],

      });

      
      this.ActCatalogoU = this.formBuilder.group(
        {
          CBCatalogoEdi:  [],
          CBTipoCatalogoEdi:  [],
          textNueDenominacionEdi:  [],
        // textNueTipoCatEdi:  []
        });
    

  }

}