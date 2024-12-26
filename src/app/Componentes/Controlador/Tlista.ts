import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Estudiante } from '../Entidades/estudiante';

@Injectable({
  providedIn: 'root',
})
export class TLista {
  private ListaEstudiantes: Estudiante[] = [
    new Estudiante(1, '0701234567', 'Juan', 'Perez', 'M', '2000-01-01', 6, 6),
    new Estudiante(2, '0707654321', 'Ana', 'Lopez', 'F', '2001-05-12', 7, 7),
  ];
  private estudiantesSubject = new BehaviorSubject<Estudiante[]>(this.ListaEstudiantes);
  estudiantes$ = this.estudiantesSubject.asObservable();

  constructor() {}

  getEstudiantes(): Estudiante[] {
    return this.estudiantesSubject.value;
  }

  addEstudiante(estudiante: Estudiante): void {
    this.ListaEstudiantes.push(estudiante);
    this.estudiantesSubject.next(this.ListaEstudiantes);
  }

  updateEstudiante(estudiante: Estudiante): void {
    const index = this.ListaEstudiantes.findIndex((e) => e.codigo === estudiante.codigo);
    if (index !== -1) {
      this.ListaEstudiantes[index] = estudiante;
      this.estudiantesSubject.next(this.ListaEstudiantes);
    }
  }

  deleteEstudiante(index: number): void {
    this.ListaEstudiantes.splice(index, 1);
    this.estudiantesSubject.next(this.ListaEstudiantes);
  }

  getAprobadosYReprobados(): { aprobados: number; reprobados: number } {
    const aprobados = this.ListaEstudiantes.filter(
      (e) => e.estadoAprobatorio === 'Aprobado'
    ).length;
    const reprobados = this.ListaEstudiantes.filter(
      (e) => e.estadoAprobatorio === 'Reprobado'
    ).length;
  
    return { aprobados, reprobados };
  }

  getPromedioGeneral(): number {
    const totalNotas = this.ListaEstudiantes.reduce(
      (sum, e) => sum + e.calificacionFinal,
      0
    );
    return totalNotas / this.ListaEstudiantes.length;
  }
  getEstudianteMayorNotaPorNotaDefinitiva(): Estudiante | null {
    if (this.ListaEstudiantes.length === 0) return null;
    return this.ListaEstudiantes.reduce((prev, current) =>
      (prev.notaDefinitiva ?? prev.calificacionFinal) > (current.notaDefinitiva ?? current.calificacionFinal)
        ? prev
        : current
    );
  }
  
  getEstudianteMayorNota(): Estudiante | null {
    if (this.ListaEstudiantes.length === 0) return null;
    return this.ListaEstudiantes.reduce((prev, current) =>
      prev.calificacionFinal > current.calificacionFinal ? prev : current
    );
  }

  getPorcentajeAprobadosPorSexo(sexo: string): number {
    const estudiantesSexo = this.ListaEstudiantes.filter((e) => e.sexo === sexo);
    const aprobados = estudiantesSexo.filter((e) => e.estadoAprobatorio === 'Aprobado').length;
    return estudiantesSexo.length ? (aprobados / estudiantesSexo.length) * 100 : 0;
  }
  
  getEstudiantesSobrePromedio(): Estudiante[] {
    const promedio = this.getPromedioGeneral();
    return this.ListaEstudiantes.filter((e) => e.calificacionFinal > promedio);
  }

  getAprobadosPorGenero(sexo: string): number {
    return this.ListaEstudiantes.filter(
      (e) => e.sexo === sexo && e.estadoAprobatorio === 'Aprobado'
    ).length;
  }
  
  getReprobadosPorGenero(sexo: string): number {
    return this.ListaEstudiantes.filter(
      (e) => e.sexo === sexo && e.estadoAprobatorio === 'Reprobado'
    ).length;
  }

}

