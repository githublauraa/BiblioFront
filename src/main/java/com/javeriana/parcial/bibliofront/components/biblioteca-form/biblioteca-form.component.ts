import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BibliotecaService } from '../../services/biblioteca.service';
import { BibliotecaRequest } from '../../models/biblioteca.model';

@Component({
  selector: 'app-biblioteca-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './biblioteca-form.component.html'
})
export class BibliotecaFormComponent {
  private bibliotecaService = inject(BibliotecaService);

  @Output() bibliotecaCreada = new EventEmitter<void>();

  nuevaBiblioteca: BibliotecaRequest = {
    nombre: '',
    direccion: '',
    ciudad: ''
  };

  mensaje: string = '';
  error: string = '';
  guardando: boolean = false;

  guardar(): void {
    if (!this.nuevaBiblioteca.nombre.trim() || !this.nuevaBiblioteca.direccion.trim() || !this.nuevaBiblioteca.ciudad.trim()) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }

    this.guardando = true;
    this.error = '';
    this.mensaje = '';

    this.bibliotecaService.registrarBiblioteca(this.nuevaBiblioteca).subscribe({
      next: () => {
        this.mensaje = 'Biblioteca registrada correctamente.';
        this.nuevaBiblioteca = { nombre: '', direccion: '', ciudad: '' };
        this.guardando = false;
        this.bibliotecaCreada.emit();
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudo registrar la biblioteca. Verifica que el backend esté activo.';
        this.guardando = false;
      }
    });
  }
}