import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListarComponent } from './Componentes/Listar/listar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'P1H2-ColeccionObjetosAngular';
}
