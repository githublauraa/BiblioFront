import { Libro } from './libro.model';

export interface BibliotecaRequest {
  nombre: string;
  direccion: string;
  ciudad: string;
}

export interface Biblioteca {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  libros: Libro[];
}