import { getItem, setItem } from "./storage";
import { HistorialEntry } from "../types/models";

const KEY = "historial";

export async function getHistorialPorMascota(mascotaId: string): Promise<HistorialEntry[]> {
  const todo = (await getItem<HistorialEntry[]>(KEY)) ?? [];
  return todo
    .filter((h) => h.mascotaId === mascotaId)
    .sort((a, b) => (a.fecha < b.fecha ? 1 : -1)); // más reciente primero
}

export async function getEntradaPorId(id: string): Promise<HistorialEntry | undefined> {
  const todo = (await getItem<HistorialEntry[]>(KEY)) ?? [];
  return todo.find((h) => h.id === id);
}

export async function crearEntrada(datos: Omit<HistorialEntry, "id">): Promise<HistorialEntry> {
  const todo = (await getItem<HistorialEntry[]>(KEY)) ?? [];
  const nueva: HistorialEntry = { ...datos, id: Date.now().toString() };
  await setItem(KEY, [...todo, nueva]);
  return nueva;
}

export async function actualizarEntrada(id: string, datos: Omit<HistorialEntry, "id">): Promise<void> {
  const todo = (await getItem<HistorialEntry[]>(KEY)) ?? [];
  const actualizadas = todo.map((h) => (h.id === id ? { ...datos, id } : h));
  await setItem(KEY, actualizadas);
}

export async function eliminarEntrada(id: string): Promise<void> {
  const todo = (await getItem<HistorialEntry[]>(KEY)) ?? [];
  await setItem(
    KEY,
    todo.filter((h) => h.id !== id)
  );
}
