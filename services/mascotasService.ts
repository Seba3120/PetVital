import { getItem, setItem } from "./storage";
import { Mascota } from "../types/models";

const KEY = "mascotas";

export async function getMascotas(): Promise<Mascota[]> {
  return (await getItem<Mascota[]>(KEY)) ?? [];
}

export async function getMascotaPorId(id: string): Promise<Mascota | undefined> {
  const mascotas = await getMascotas();
  return mascotas.find((m) => m.id === id);
}

export async function crearMascota(datos: Omit<Mascota, "id">): Promise<Mascota> {
  const mascotas = await getMascotas();
  const nueva: Mascota = { ...datos, id: Date.now().toString() };
  await setItem(KEY, [...mascotas, nueva]);
  return nueva;
}

export async function actualizarMascota(id: string, datos: Omit<Mascota, "id">): Promise<void> {
  const mascotas = await getMascotas();
  const actualizadas = mascotas.map((m) => (m.id === id ? { ...datos, id } : m));
  await setItem(KEY, actualizadas);
}

export async function eliminarMascota(id: string): Promise<void> {
  const mascotas = await getMascotas();
  await setItem(
    KEY,
    mascotas.filter((m) => m.id !== id)
  );
}
