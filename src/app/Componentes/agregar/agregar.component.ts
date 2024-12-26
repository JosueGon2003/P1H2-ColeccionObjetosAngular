import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Estudiante } from '../Entidades/estudiante';
import { TLista } from '../Controlador/Tlista';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent {
 @Input() isOpen = false;
  @Input() selectedEstudiante: Estudiante | null = null;
  @Output() close = new EventEmitter<void>();

  estudiante: Estudiante = new Estudiante(0, '', '', '', '', '', 0, 0);

  constructor(private listaService: TLista) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedEstudiante'] && this.selectedEstudiante) {
      this.estudiante = new Estudiante(
        this.selectedEstudiante.codigo,
        this.selectedEstudiante.cedula,
        this.selectedEstudiante.nombres,
        this.selectedEstudiante.apellidos,
        this.selectedEstudiante.sexo,
        this.selectedEstudiante.fechaNacimiento,
        this.selectedEstudiante.parcial1,
        this.selectedEstudiante.parcial2,
        this.selectedEstudiante.examenRecuperacion
      );
    } else {
      this.resetEstudiante();
    }
  }

  resetEstudiante(): void {
    this.estudiante = new Estudiante(0, '', '', '', '', '', 0, 0);
  }

  closeModal(): void {
    this.close.emit();
  }

  updateNotaDefinitiva(): void {
    if (
      this.estudiante.estadoAprobatorio === 'Pendiente de Recuperación' &&
      this.estudiante.examenRecuperacion !== undefined
    ) {
      this.estudiante.calculateNotaDefinitiva();
    }
  }

  onSubmit(): void {
    this.estudiante.calificacionFinal = this.estudiante.calculateCF();
    this.estudiante.estadoAprobatorio = this.estudiante.calculateEstado();
  
    if (
      this.estudiante.estadoAprobatorio === 'Pendiente de Recuperación' &&
      this.estudiante.examenRecuperacion !== undefined
    ) {
      this.estudiante.calculateNotaDefinitiva();
    }
  
    if (this.selectedEstudiante) {
      this.listaService.updateEstudiante(this.estudiante);
    } else {
      this.listaService.addEstudiante(this.estudiante);
    }
  
    this.closeModal();
  }
}