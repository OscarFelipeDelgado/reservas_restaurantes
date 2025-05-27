import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DiuHoyService } from '../diu-hoy-service.service';
import { ChangeDetectorRef } from '@angular/core';

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
  tablaTipo_Catalogo: string[] = [];
  controlLista2: boolean = false;
  valorTipoCatNombre: string = "";
  
  CataUniCatalogo: any = [];                  //Lista catalogo Catalogo
  titloCataUniEditar = "";                    //Titulo de Color a Editar
  CataUniCataEdi: any = [];                    // Registro del catalogo a editar
  //public valorTipoCat = 0;                    //Variables para pasar parametros a los metodos
  //public controlLista2 = 1;                   //Control para limpiar la lista tipo catalogo
  // CataUniCatalogo: any[] = [];                  //Lista catalogo Catalogo
  public valorCatEdit = 0;                    //Variables para pasar parametros a los metodos

  // Formularios
  ListarCatTotales = new FormGroup({
    Listaa: new FormControl()
  });

    //--------------------------------------------------------------------------

    //Grupo para formulario mostrar tipo de Catalogo
    CBCatalogoCatalogo = new FormGroup 
    (
      {
        CatCatalogofiltro: new FormControl(),
      }
    );

//..................................................................

    //Grupo para crear Catalogos
    CrearCatalogoU = new FormGroup 
    (
      {
        CBTipo_Catalogo: new FormControl(),
        textNueValor_Catalogo: new FormControl(),
      }
    );

//..................................................................

    //Grupo para editar Catalogos
    ActCatalogoU = new FormGroup 
    (
      {
        CBCatalogoEdi: new FormControl(),
        CBTipo_CatalogoEdi: new FormControl(),
        textNueValor_CatalogoEdi: new FormControl(),
       // textNueTipoCatEdi: new FormControl(),
      }
    );


//+++++++++++++++++++++++++++++++++++++++++++++++++++++

  constructor(
    private formBuilder: FormBuilder,
    private servi: DiuHoyService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}



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
      this.tablaTipo_Catalogo = ["Id", "Denominación"];
      this.controlLista2 = true;
    
    }).catch(error => console.error("Error en getlListCatologoEsp:", error));
  }

  //-------------------------------------------------------------------------
  //Para insertar una nuevo catalogo

  public InsertarNuevoCatalogo()   
  {
      //variables para armar el JSON que se va a enviar al Back-End
      var datosvalo1 =  this.CrearCatalogoU.getRawValue()['textNueValor_Catalogo']; 
      var datosvalo2 =  this.CrearCatalogoU.getRawValue()['CBTipo_Catalogo'];


       console.log(" aca 236  Valor_Catalogo  " + datosvalo1 + " tipo " + datosvalo2);
      //JSON armado
      var cadena = {"Valor_Catalogo": datosvalo1,
                    "Tipo_Catalogo":datosvalo2,
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
      console.log('Respuesta del servicio:', data);
      this.CataUniCataEdi = data.data;

      this.titloCataUniEditar = "CATALOGO A EDITAR";

      // Actualiza el formulario con los datos del catálogo a editar
      this.ActCatalogoU.patchValue({
        CBCatalogoEdi: data.data.Id_Catalogo,
        textNueValor_CatalogoEdi: data.data.Valor_Catalogo,
        CBTipo_CatalogoEdi: data.data.Tipo_Catalogo
      });

      // Forzar ciclo de detección de cambios para evitar el error NG0100
      this.cdRef.detectChanges();

    }).catch(error => {
      console.log(error);
    });

  }


  // -----------------------------------------------------------------------------------------
  // método para actualizar un catalogo .

  public ActualizarCatalogo() 
  {

      //variables para armar el JSON que se va a enviar al Back-End
      var datosvalo1 =  this.ActCatalogoU.getRawValue()['CBCatalogoEdi'];
      var datosvalo2 =  this.ActCatalogoU.getRawValue()['textNueValor_CatalogoEdi']; 
      var datosvalo3 =  this.ActCatalogoU.getRawValue()['CBTipo_CatalogoEdi'];

      
      //JSON armado
      var cadena = {"IdCataUniv":datosvalo1,
                    "Valor_Catalogo":datosvalo2,
                    "Tipo_Catalogo":datosvalo3
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
        CBTipo_Catalogo: [],
        textNueValor_Catalogo: [],

      });

      
    this.ActCatalogoU = this.formBuilder.group(
      {
        CBCatalogoEdi:  [],
        CBTipo_CatalogoEdi:  [],
        textNueValor_CatalogoEdi:  [],
      // textNueTipoCatEdi:  []
      });
  }

}