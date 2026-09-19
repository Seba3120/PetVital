const REGEX_FECHA = /^(\d{2})-(\d{2})-(\d{4})$/;

/**
 * Valida que un texto tenga el formato dd-mm-aaaa Y que sea una fecha real.
 * Rechaza cosas como "31-02-2024" (febrero no tiene 31 días), no solo
 * el formato de los números.
 */
export function esFechaValida(texto: string): boolean {
  const coincidencia = texto.match(REGEX_FECHA);
  if (!coincidencia) return false;

  const dia = Number(coincidencia[1]);
  const mes = Number(coincidencia[2]);
  const anio = Number(coincidencia[3]);

  const fecha = new Date(anio, mes - 1, dia);
  // Si Date "corrige" el día/mes (ej. 31 de febrero -> 3 de marzo),
  // significa que la fecha ingresada no existía de verdad.
  return (
    fecha.getFullYear() === anio &&
    fecha.getMonth() === mes - 1 &&
    fecha.getDate() === dia
  );
}

/**
 * Convierte un texto "dd-mm-aaaa" a un objeto Date, para poder comparar
 * y ordenar cronológicamente. Ordenar el texto tal cual ("02-06-2023" vs
 * "15-09-2023") NO da el orden correcto, por eso este paso es necesario.
 */
export function convertirAFecha(texto: string): Date {
  const [dia, mes, anio] = texto.split("-").map(Number);
  return new Date(anio, mes - 1, dia);
}
