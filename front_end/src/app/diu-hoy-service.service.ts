import { Injectable } from '@angular/core';
import axios from 'axios';

import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DiuHoyService 
{


  private Url: string = 'http://localhost:3000';

  constructor() { }

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
    return axios.get(this.Url + "/Universal");
  }

  //-------------------------------------------------------------
  //Lista los tipos de catalogos que hay 

   getlListCatologos(): Promise<any> 
   {
      return axios.get(this.Url + "/Universal/1");

   }

   //-------------------------------------------------------------
   //Lista el tipo de catalogo que se seleciono

   getlListCatologoEsp(tipcat: any): Promise<any> 
   {
      return axios.get(this.Url + "/Universal"+ tipcat);

   }
   
   //-------------------------------------------------------------
   
  
}
