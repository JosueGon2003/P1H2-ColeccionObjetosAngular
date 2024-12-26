import { Persona } from "./persona";

export class Estudiante extends Persona {
  // Atributos del estudiante
  codigo: number;
  parcial1: number;
  parcial2: number;
  examenRecuperacion?: number;
  calificacionFinal: number;
  notaDefinitiva?: number;
  estadoAprobatorio: string;

  constructor(
    codigo: number,
    cedula: string,
    nombres: string,
    apellidos: string,
    sexo: string,
    fechaNacimiento: string,
    parcial1: number,
    parcial2: number,
    examenRecuperacion?: number
  ) {
    super(cedula, nombres, apellidos, sexo, fechaNacimiento);
    this.codigo = codigo;
    this.parcial1 = parcial1;
    this.parcial2 = parcial2;
    this.examenRecuperacion = examenRecuperacion ?? null!;
    this.calificacionFinal = this.calculateCF();
    this.estadoAprobatorio = this.calculateEstado();
  }

  // Calcular la calificación final (promedio de los parciales)
  public calculateCF(): number {
    return (this.parcial1 + this.parcial2) / 2;
  }

  // Calcular el estado de aprobación
  public calculateEstado(): string {
    if (this.calificacionFinal >= 7) {
      return 'Aprobado';
    } else if (this.calificacionFinal < 5.5) {
      return 'Reprobado';
    } else {
      return 'Pendiente de Recuperación';
    }
  }

  // Calcular la nota definitiva considerando la nota de recuperación
  public calculateNotaDefinitiva(): void {
    if (this.estadoAprobatorio === 'Pendiente de Recuperación' && this.examenRecuperacion) {
      this.notaDefinitiva = this.calificacionFinal * 0.4 + this.examenRecuperacion * 0.6;
      this.estadoAprobatorio = this.notaDefinitiva >= 7 ? 'Aprobado' : 'Reprobado';
    }
  }
}
