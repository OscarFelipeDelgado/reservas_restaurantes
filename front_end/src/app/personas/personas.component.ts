import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DiuHoyService } from '../diu-hoy-service.service';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgFor, CommonModule, ReactiveFormsModule],
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  title = "PERSONAS";

  // Listado general de personas
  tituloPersonasLista = "";
  personasList: any[] = [];
  controlLista1: boolean = false;

  // Listado para persona individual por ID
  personaSeleccionada: any = null;
  controlLista2: boolean = false;

  // Formulario para seleccionar ID persona
  personaForm: FormGroup;

  constructor(private service: DiuHoyService, private fb: FormBuilder) {
    this.personaForm = this.fb.group({
      personaId: ['']
    });
  }

  ngOnInit(): void {
    this.tituloPersonasLista = "Listado General de Personas";
  }

  // Método para listar todas las personas
  async listarTodasPersonas() {
    try {
      const response = await this.service.getPersonas();
      this.personasList = response.data || response;  // según estructura de respuesta
      this.controlLista1 = true;
    } catch (error) {
      console.error("Error al obtener personas", error);
    }
  }

  // Limpiar listado general
  limpiarListado1() {
    this.personasList = [];
    this.controlLista1 = false;
  }

  // Mostrar persona por ID
  async mostrarPersonaPorId() {
    const id = this.personaForm.value.personaId;
    if (!id) {
      alert("Por favor seleccione un ID de persona");
      return;
    }
    try {
      const response = await this.service.getPersonaById(id);
      this.personaSeleccionada = response.data || response;
      this.controlLista2 = true;
    } catch (error) {
      console.error("Error al obtener persona por ID", error);
      alert("No se encontró persona con el ID especificado");
      this.personaSeleccionada = null;
      this.controlLista2 = false;
    }
  }

  // Limpiar listado persona individual
  limpiarListado2() {
    this.personaSeleccionada = null;
    this.controlLista2 = false;
    this.personaForm.reset();
  }
}
