import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibliotecaService } from '../../services/biblioteca.service';
import { LibroConBiblioteca } from '../../models/libro.model';

@Component({
  selector: 'app-libros-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './libros-table.component.html'
})
export class LibrosTableComponent implements OnInit {
  private bibliotecaService = inject(BibliotecaService);

  libros: LibroConBiblioteca[] = [];
  cargando: boolean = false;
  error: string = '';

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.cargando = true;
    this.error = '';

    this.bibliotecaService.consultarBibliotecas().subscribe({
      next: (bibliotecas) => {
        // Extrae los libros asociados de cada biblioteca recibida desde GET /bibliotecas
        this.libros = bibliotecas.flatMap(bib =>
          (bib.libros || []).map(libro => ({
            ...libro,
            nombreBiblioteca: bib.nombre
          }))
        );
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al consultar los datos del backend.';
        this.cargando = false;
      }
    });
  }
}