/**
 * Convierte lo que el usuario escribió a un número JS válido.
 * JavaScript internamente SIEMPRE usa punto decimal (Number("28,5") da NaN),
 * así que aceptamos que el usuario escriba con coma O con punto, y lo
 * normalizamos antes de convertir.
 */
export function textoANumero(texto: string): number {
  return Number(texto.replace(",", "."));
}

/**
 * Formatea un número para MOSTRARLO con coma decimal, como se usa en Chile.
 * 28.5 -> "28,5"   28 -> "28"   3.25 -> "3,25"
 */
export function formatearNumero(valor: number): string {
  return String(valor).replace(".", ",");
}
