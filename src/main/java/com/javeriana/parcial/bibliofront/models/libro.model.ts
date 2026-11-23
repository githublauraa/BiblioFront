export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  anioPublicacion: number;
}

// Interfaz auxiliar para pintar cada fila de la tabla con el nombre de su biblioteca
export interface LibroConBiblioteca extends Libro {
  nombreBiblioteca: string;
}