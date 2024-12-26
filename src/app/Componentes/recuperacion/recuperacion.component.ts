import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Estudiante } from '../Entidades/estudiante';
import { TLista } from '../Controlador/Tlista';
@Component({
  selector: 'app-recuperacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recuperacion.component.html',
  styleUrl: './recuperacion.component.css'
})
export class RecuperacionComponent {
  @Input() isRecuperacionOpen = false;
  @Input() selectedEstudiante: Estudiante | null = null;
  @Output() close = new EventEmitter<void>();

  notaRecuperacion: number = 0;
  estudiante: Estudiante | null = null;

  constructor(private listaService: TLista) {}

  ngOnChanges(): void {
    if (this.selectedEstudiante) {
      this.estudiante = this.selectedEstudiante;
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.estudiante && this.notaRecuperacion !== null) {
      this.estudiante.examenRecuperacion = this.notaRecuperacion;
    if (this.estudiante) {
      this.estudiante.examenRecuperacion = this.notaRecuperacion;
      this.estudiante.calculateNotaDefinitiva();
      this.listaService.updateEstudiante(this.estudiante);
    }
    }
    this.closeModal();
  }
  
}
