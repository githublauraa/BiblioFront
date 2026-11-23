import { Component, ViewChild } from '@angular/core';
import { BibliotecaFormComponent } from './components/biblioteca-form/biblioteca-form.component';
import { LibrosTableComponent } from './components/libros-table/libros-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BibliotecaFormComponent, LibrosTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(LibrosTableComponent) tablaLibros!: LibrosTableComponent;

  alCrearBiblioteca(): void {
    if (this.tablaLibros) {
      this.tablaLibros.cargarLibros();
    }
  }
}