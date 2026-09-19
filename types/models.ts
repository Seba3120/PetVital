export type Especie = "Perro" | "Gato" | "Otro";
export type Sexo = "Macho" | "Hembra";

export interface Mascota {
  id: string;
  nombre: string;
  especie: Especie;
  raza: string;
  fechaNacimiento: string; // formato "YYYY-MM-DD"
  peso: number;            // en kg
  colorPelaje: string;
  sexo: Sexo;
}

export interface HistorialEntry {
  id: string;
  mascotaId: string;       // a qué mascota pertenece
  fecha: string;           // "YYYY-MM-DD"
  diagnostico: string;
  tratamiento: string;
  veterinario: string;
  clinica?: string;
}
