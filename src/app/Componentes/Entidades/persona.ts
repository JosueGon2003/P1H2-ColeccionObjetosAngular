export class Persona {
    cedula: string;
    nombres: string;
    apellidos: string;
    sexo: string;
    fechaNacimiento: string;
  
    constructor(
      cedula: string,
      nombres: string,
      apellidos: string,
      sexo: string,
      fechaNacimiento: string
    ) {
      this.cedula = cedula;
      this.nombres = nombres;
      this.apellidos = apellidos;
      this.sexo = sexo;
      this.fechaNacimiento = fechaNacimiento;
    }
  }