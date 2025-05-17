import { Routes } from '@angular/router';

import {AppComponent} from './app.component'
import {CatalogoUniversalComponent} from './catalogo-universal/catalogo-universal.component'
import {MenuInicioComponent} from'./menu-inicio/menu-inicio.component';

export const routes: Routes = [
    {path:"", pathMatch: 'prefix', redirectTo: "MenuInicio"},
    {path: "Universal", component: CatalogoUniversalComponent},
    {path: "MenuInicio", component: MenuInicioComponent}
];