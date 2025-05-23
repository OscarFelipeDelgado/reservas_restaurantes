import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DiuHoyService } from '../diu-hoy-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo-universal',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgFor, CommonModule, ReactiveFormsModule],
  templateUrl: './catalogo-universal.component.html',
  styleUrl: './catalogo-universal.component.css'
})
export class CatalogoUniversalComponent 
{

  //LAS VARIABLES 
  title = "MANEJO DE CATALOGO UNIVERSAL";    //Titulo dela página

  //Variables Listado general 
  tituloCataUniLista = "";              //Titulo Lista de todos los catalogos
  CataUniT: any = [];                   //Lista de todos los catalogos
  tablacatalogosstotales: any= [];          //Encabezados tabla catalogos totales
  controlLista1 = 1;               //Control para limpiar la lista

  //variables un tipo de catalogo
  titloCataUniTipo = "";                      //Titulo de un solo tipo de catalogo Universal
  CataUniTipo: any= [];                      //Lista de un tipo de Catalogo
  ListaTipos: any = [];                       //Lista de los tipo de Catalogos para el comboBox
  tablaTipoCatalogo: any = [];                //Encabezados tabla un tipo de catalogo
 
  //public valorTipoCat = 0;                    //Variables para pasar parametros a los metodos
  public controlLista2 = 1;                   //Control para limpiar la lista tipo catalogo
// CataUniCatalogo: any[] = [];                  //Lista catalogo Catalogo
 
  //--------------------------------------------------------------------------

    //Grupo para formulario mostrar tipo de Catalogo
    CBCatalogoCatalogo = new FormGroup 
    (
      {
        CatCatalogofiltro: new FormControl(),
      }
    );

  

  //*****************************************************************************
  //Form group  //Grupo para la lista de Colores
  ListarCatTotales = new FormGroup
    (
      {
        Listaa: new FormControl()
      }
    );


//+++++++++++++++++++++++++++++++++++++++++++++++++++++


  constructor
    (
      private formBuilder: FormBuilder,
      private servi: DiuHoyService,
      Router: Router,    
    ) { }

  //=============================================================
  //LOS CRUD
  //=============================================================
  //Lista de todos los catalogos

  public consultaCatalogosTotales() 
  {

    this.controlLista1=1;
    
      this.servi.getCatalogoTotal().then((data) => {
        //console.log (data.data);
        this.CataUniT = data.data;  
        this.tituloCataUniLista = "LISTA DE TODOS LOS CATALOGOS";
        this.tablacatalogosstotales[0] = "Id";
        this.tablacatalogosstotales[1] = "Denominación";
        this.tablacatalogosstotales[2] = "LLaveForanea";
      },
        error => { console.error(error + " ") });
    }

  //--------------------------------------------------------------------------------------------->
  //para Limpiar la lista

  public LimpiarLista1() 
  {
    this.controlLista1 = 0;
  }
  
  public LimpiarLista2() 
  {
    this.controlLista2 = 0;
  }

//--------------------------------------------------------------------------------------------->
//para listar los Tipos de catalogos en el comboBox

  public ListarTiposCatalogos() 
  {   
    
          this.servi.getlListCatologos().then((data) =>  //{catalogouiversal:[]}) 
          {
                //console.log(" aca 234 " + data.data);
                this.ListaTipos = data.data; 
                //this.controlLista2 = 1;
                

          },
        error => { console.error(error + " ") });

  }

// -----------------------------------------------------------------------------------------
// Listar un solo tipo de Catalogo

  public ListarCatalogoE() 
  {
     
    var valorTipoCat =  this.CBCatalogoCatalogo.getRawValue()['CatCatalogofiltro'];

     /* if(this.controlLista == 1)
      {*/
        this.controlLista2 = 1;

        this.servi.getlListCatologoEsp('/'+ valorTipoCat  ).then((data) => 
        {

            this.CataUniTipo = data.data; 
            console.log(" aca 234 " );
            this.titloCataUniTipo = "LISTA DEL CATALOGO DE " + this.CataUniTipo.Denominacion;
            this.tablaTipoCatalogo[0] = "Id";
            this.tablaTipoCatalogo[1] = "Denominación";   
                  
        },
        error => { console.error(error + " ") });      
     /* }
     else
      {  
        this.LimpiarLista();
      } */
      //this.CBCatalogoCatalogo.reset();
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


  }

}
