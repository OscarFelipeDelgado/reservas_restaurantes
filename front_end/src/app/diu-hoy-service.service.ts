import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions =
{
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class DiuHoyService 
{


  private Url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {} // inyección correcta

  private extractData(res: Response) 
  {
    //console.log("22");
 
     let body = JSON.parse('' + res);
     //console.log("23 A " + body);
     return body || {};
   }
 
 
 
   private handleError<T>(operation = 'operation', result?: T) 
   {
     //console.log("25 ");
     return (error: any): Observable<T> => 
     {
 
       console.log(`${operation} failed: ${error.message}`);
       return of(result as T)
 
     };
   }
 
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // SERVICIO  CATALOGO UNIVERSAL
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 

    getCatalogoTotal(): Promise<any> 
    {
      return axios.get(this.Url + "/CataUniversal");
    }

  //-------------------------------------------------------------
  //Lista los tipos de catalogos que hay 

   getlListCatologos(): Promise<any> 
   {
      return axios.get(this.Url + "/CataUniversal/1");

   }

   //-------------------------------------------------------------
   //Lista el tipo de catalogo que se seleciono

   getlListCatologoEsp(tipcat: any): Promise<any> 
   {
      return axios.get(this.Url + "/CataUniversal"+ tipcat);

   }
   
   //-------------------------------------------------------------
    // Método para insertar un nuevo Catalogo

    async CrearCatalogoU(Dato:any): Promise<any> 
    {

      return new Promise((resolve, reject) => {
      this.http.post(this.Url +  "/Universal",Dato, httpOptions).toPromise()
      });
    }
 
  //-------------------------------------------------------------
    //lista todos los catalogos que hay

    getCatalogoTotalOrd(): Promise<any> 
    {
      return axios.get(this.Url + "/Universal");
      
    }    
    //--------------------------------------------------------------
  // lista el registro selecionado por ID

      getlCatEdit(Id: any): Promise<any> 
      {
            console.log(" estamos acaaaa " + Id);
        return axios.get(this.Url + "/Universal/unosolo/" + Id);
  
      }
      

    //-------------------------------------------------------------
  
  // -----------------------------------------------------------------------------------------
      // Método para modificar un Catalogo

      async ActualizarCatalogoU(Dato:any): Promise<any> 
      {
        console.log(" estamos aaaaa " + Dato.IdCataUniv + "  ww  " + Dato.Denominacion + "  qqq  " + Dato.TipoCatalogo);
        return new Promise((resolve, reject) => {
        this.http.put(this.Url +  "/Universal",Dato, httpOptions).toPromise()
        });

      }
      
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
}
