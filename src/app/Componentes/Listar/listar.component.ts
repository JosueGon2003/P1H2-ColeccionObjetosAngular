import { Component } from '@angular/core';
import { Estudiante } from '../Entidades/estudiante';
import { TLista } from '../Controlador/Tlista';
import { CommonModule } from '@angular/common';
import { AgregarComponent } from '../agregar/agregar.component';
import { RecuperacionComponent } from '../recuperacion/recuperacion.component';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, AgregarComponent, RecuperacionComponent],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {
  estudiantes: Estudiante[] = [];
  selectedEstudiante: Estudiante | null = null;
  isOpen = false;
  isRecuperacionOpen = false; // Controla la apertura del modal de recuperación.

  porcentajeAprobados: number = 0;
  porcentajeReprobados: number = 0;
  promedioGeneral: number = 0;
  porcentajeAprobadosHombres: number = 0;
  porcentajeAprobadosMujeres: number = 0;
  estudianteMayorNota: Estudiante | null = null;

  constructor(private listaService: TLista) {}

  ngOnInit(): void {
    this.listaService.estudiantes$.subscribe((data) => {
      this.estudiantes = data;
      this.calculateStatistics();
    });
    
  }

  editEstudiante(estudiante: Estudiante): void {
    this.selectedEstudiante = new Estudiante(
      estudiante.codigo,
      estudiante.cedula,
      estudiante.nombres,
      estudiante.apellidos,
      estudiante.sexo,
      estudiante.fechaNacimiento,
      estudiante.parcial1,
      estudiante.parcial2,
      estudiante.examenRecuperacion
    );
    this.selectedEstudiante.notaDefinitiva = estudiante.notaDefinitiva;
    this.selectedEstudiante.estadoAprobatorio = estudiante.estadoAprobatorio;

    this.isOpen = true;
  }

  deleteEstudiante(index: number): void {
    this.listaService.deleteEstudiante(index);
    this.calculateStatistics();
  }

  onCloseModal(): void {
    this.isOpen = false;
    this.selectedEstudiante = null;
    this.calculateStatistics();
  }

  openRecuperacionModal(estudiante: any): void {
    this.selectedEstudiante = estudiante;  
    this.isRecuperacionOpen = true;  
  }
  

  onCloseRecuperacionModal(): void {
    this.isRecuperacionOpen = false;
    this.selectedEstudiante = null;
    this.calculateStatistics();
  }

  private calculateStatistics(): void {
    const { aprobados, reprobados } = this.listaService.getAprobadosYReprobados();
    const totalEstudiantes = this.estudiantes.length;
  
    this.porcentajeAprobados = totalEstudiantes > 0 ? (aprobados / totalEstudiantes) * 100 : 0;
    this.porcentajeReprobados = totalEstudiantes > 0 ? (reprobados / totalEstudiantes) * 100 : 0;
  
    const totalNotaDefinitiva = this.estudiantes.reduce(
      (sum, estudiante) => sum + (estudiante.notaDefinitiva ?? estudiante.calificacionFinal),
      0
    );
    this.promedioGeneral = totalEstudiantes > 0 ? totalNotaDefinitiva / totalEstudiantes : 0;
  
    this.calculatePorcentajeAprobadosPorGenero();
    this.estudianteMayorNota = this.listaService.getEstudianteMayorNotaPorNotaDefinitiva();
  }
  
  private calculatePorcentajeAprobadosPorGenero(): void {
    const totalHombres = this.estudiantes.filter((e) => e.sexo === 'M').length;
    const totalMujeres = this.estudiantes.filter((e) => e.sexo === 'F').length;

    const aprobadosHombres = this.estudiantes.filter(
      (e) => e.sexo === 'M' && e.estadoAprobatorio === 'Aprobado'
    ).length;

    const aprobadosMujeres = this.estudiantes.filter(
      (e) => e.sexo === 'F' && e.estadoAprobatorio === 'Aprobado'
    ).length;

    this.porcentajeAprobadosHombres =
      totalHombres > 0 ? (aprobadosHombres / totalHombres) * 100 : 0;

    this.porcentajeAprobadosMujeres =
      totalMujeres > 0 ? (aprobadosMujeres / totalMujeres) * 100 : 0;
  }
}