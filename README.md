# PetVital — paquete de avance

Este zip NO es un proyecto Expo completo (no trae `package.json`, `node_modules`
ni el proyecto base). Es la capa de código que se integra DENTRO del proyecto
que ya creaste con `create-expo-app` + NativeWind. Así evitamos pisar tu
configuración base (babel, metro, app.json, etc.) que ya tienes funcionando.

## 1. Instalar las dependencias nuevas

Desde la raíz de tu proyecto Expo (donde está tu `package.json`):

```bash
npx expo install @react-native-async-storage/async-storage
npx expo install expo-font expo-splash-screen
npx expo install @expo-google-fonts/poppins
```

`@expo/vector-icons` (usado para los íconos de las pestañas) ya viene incluido
por defecto en cualquier proyecto creado con `create-expo-app`, no requiere
instalación aparte.

## 2. Copiar las carpetas de este zip

**Importante:** si ya habías integrado una versión anterior de este paquete,
**borra `app/index.tsx`** de tu proyecto — ese archivo ya no existe aquí,
se reemplazó por `app/(tabs)/index.tsx` y `app/(tabs)/mascotas.tsx`.

Copia y reemplaza dentro de tu proyecto:

- `app/(tabs)/` → carpeta nueva completa, cópiala tal cual.
- `app/mascotas/` → se agrega/reemplaza (sin cambios respecto a la versión
  anterior si ya la tenías).
- `app/_layout.tsx` → reemplaza el tuyo.
- `components/`
- `services/`
- `types/`
- `constants/`
- `tailwind.config.js` → reemplaza el tuyo (ya incluye la config anterior
  + la paleta de colores nueva).

## 3. Verificar `global.css`

Debe seguir en la raíz del proyecto (junto a `app.json`), sin cambios:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 4. Reiniciar con caché limpia

```bash
npx expo start -c
```

## Qué incluye este paquete

- `constants/theme.ts` — paleta de colores y nombres de fuentes en un solo lugar.
- `types/models.ts` — tipos `Mascota` y `HistorialEntry`.
- `services/storage.ts` — wrapper genérico sobre AsyncStorage.
- `services/mascotasService.ts` — CRUD completo de mascotas.
- `services/historialService.ts` — CRUD completo de entradas de historial médico.
- `app/_layout.tsx` — carga las fuentes Poppins y define el Stack de navegación.
- `app/index.tsx` — pantalla de Inicio (lista de mascotas).
- `components/Boton.tsx` — botón reutilizable (3 variantes).
- `components/MascotaCard.tsx` — card de mascota para la lista.
- `components/MascotaForm.tsx` — formulario reutilizable (crear y editar
  mascota usan el mismo componente).
- `app/mascotas/nueva.tsx` — pantalla para crear una mascota.
- `app/mascotas/[id]/index.tsx` — ficha de la mascota: datos generales,
  contador de entradas del historial, y accesos a editar/eliminar.
- `app/mascotas/[id]/editar.tsx` — editar mascota, reutiliza `MascotaForm`.
- `components/HistorialCard.tsx` — card de una entrada del historial (timeline).
- `components/HistorialForm.tsx` — formulario reutilizable (crear y editar
  una entrada del historial usan el mismo componente).
- `app/mascotas/[id]/historial/index.tsx` — lista del historial médico.
- `app/mascotas/[id]/historial/nueva.tsx` — crear una entrada.
- `app/mascotas/[id]/historial/[entradaId].tsx` — ver/editar/eliminar una
  entrada específica.

## Estado: requisitos de la pauta completos

- ✅ CRUD de mascotas (crear, leer, actualizar, eliminar).
- ✅ Historial de mascotas: ver ficha y edición de ficha (más creación y
  eliminación de entradas, que suman valor sin costar nada extra).
- ✅ 3 colores mínimo (`background`, `primary`, `secondary`, `accent` — son 4).
- ✅ 1 fuente (Poppins, en 3 pesos: Regular, Medium, Bold).
- ✅ Navegación básica entre pantallas (Expo Router: pestañas inferiores +
  stack para las pantallas de detalle/formularios).

## Estructura de navegación (actualizada)

```
app/
  _layout.tsx          → Stack raíz. Contiene el grupo (tabs) sin header
                          propio (las pestañas ponen su propio header) y
                          las rutas de "mascotas/..." que se apilan ENCIMA
                          de las pestañas (por eso al entrar a una ficha,
                          la barra de pestañas desaparece: es la pantalla
                          de detalle tomando toda la pantalla).
  (tabs)/
    _layout.tsx         → Barra inferior: Inicio y Mascotas.
    index.tsx           → Pestaña "Inicio": resumen + accesos rápidos.
    mascotas.tsx         → Pestaña "Mascotas": la lista completa (antes
                          vivía en app/index.tsx, se movió aquí).
  mascotas/
    nueva.tsx           → Crear mascota (se abre encima de las pestañas).
    [id]/
      index.tsx         → Ficha (ver).
      editar.tsx        → Editar.
      historial/
        index.tsx       → Lista del historial (timeline).
        nueva.tsx       → Crear entrada.
        [entradaId].tsx → Ver/editar/eliminar una entrada.
```

**Nota sobre el paréntesis en `(tabs)`:** en Expo Router, una carpeta entre
paréntesis es un "grupo de rutas" — organiza archivos sin que el nombre
del grupo aparezca en la URL. Por eso `app/(tabs)/mascotas.tsx` responde en
la ruta `/mascotas`, exactamente igual que si no estuviera agrupado.

## Posibles mejoras (no obligatorias)

- Selector de fecha nativo en vez de texto libre (`@react-native-community/datetimepicker`).
- Pantallas de login/registro (visual, sin backend real).
- Foto de la mascota (`expo-image-picker` + guardar URI local).
