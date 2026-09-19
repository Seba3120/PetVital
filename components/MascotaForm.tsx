import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Mascota, Especie, Sexo } from "../types/models";
import { esFechaValida } from "../utils/fecha";
import { textoANumero, formatearNumero } from "../utils/numero";
import Boton from "./Boton";

interface Props {
  mascotaInicial?: Mascota;
  onSubmit: (datos: Omit<Mascota, "id">) => void;
  textoBoton?: string;
}

const ESPECIES: Especie[] = ["Perro", "Gato", "Otro"];
const SEXOS: Sexo[] = ["Macho", "Hembra"];

export default function MascotaForm({
  mascotaInicial,
  onSubmit,
  textoBoton = "Guardar Mascota",
}: Props) {
  // Si viene "mascotaInicial" (caso edición), precargamos los campos.
  // Si no viene (caso creación), arrancan vacíos con valores por defecto.
  const [nombre, setNombre] = useState(mascotaInicial?.nombre ?? "");
  const [especie, setEspecie] = useState<Especie>(mascotaInicial?.especie ?? "Perro");
  const [raza, setRaza] = useState(mascotaInicial?.raza ?? "");
  const [fechaNacimiento, setFechaNacimiento] = useState(mascotaInicial?.fechaNacimiento ?? "");
  const [peso, setPeso] = useState(mascotaInicial ? formatearNumero(mascotaInicial.peso) : "");
  const [colorPelaje, setColorPelaje] = useState(mascotaInicial?.colorPelaje ?? "");
  const [sexo, setSexo] = useState<Sexo>(mascotaInicial?.sexo ?? "Macho");
  const [error, setError] = useState("");

  function manejarGuardar() {
    if (
      !nombre.trim() ||
      !raza.trim() ||
      !fechaNacimiento.trim() ||
      !peso.trim() ||
      !colorPelaje.trim()
    ) {
      setError("Completa todos los campos antes de guardar.");
      return;
    }

    if (!esFechaValida(fechaNacimiento.trim())) {
      setError("La fecha de nacimiento debe tener el formato dd-mm-aaaa y ser válida.");
      return;
    }

    const pesoNumerico = textoANumero(peso);
    if (Number.isNaN(pesoNumerico) || pesoNumerico <= 0) {
      setError("El peso debe ser un número válido mayor a 0.");
      return;
    }

    setError("");
    onSubmit({
      nombre: nombre.trim(),
      especie,
      raza: raza.trim(),
      fechaNacimiento: fechaNacimiento.trim(),
      peso: pesoNumerico,
      colorPelaje: colorPelaje.trim(),
      sexo,
    });
  }

  return (
    <View className="gap-4">
      <Campo etiqueta="Nombre de la Mascota">
        <TextInput
          value={nombre}
          onChangeText={setNombre}
          placeholder="Ej. Luna"
          className="bg-surface rounded-full px-4 py-3"
          style={{ fontFamily: "Poppins_400Regular" }}
        />
      </Campo>

      <Campo etiqueta="Especie">
        <SelectorChips opciones={ESPECIES} valor={especie} onCambiar={setEspecie} />
      </Campo>

      <Campo etiqueta="Raza">
        <TextInput
          value={raza}
          onChangeText={setRaza}
          placeholder="Ej. Golden Retriever"
          className="bg-surface rounded-full px-4 py-3"
          style={{ fontFamily: "Poppins_400Regular" }}
        />
      </Campo>

      <Campo etiqueta="Fecha de Nacimiento (DD-MM-AAAA)">
        <TextInput
          value={fechaNacimiento}
          onChangeText={setFechaNacimiento}
          placeholder="10-05-2023"
          className="bg-surface rounded-full px-4 py-3"
          style={{ fontFamily: "Poppins_400Regular" }}
        />
      </Campo>

      <View className="flex-row gap-3">
        <View className="flex-1">
          <Campo etiqueta="Peso (kg)">
            <TextInput
              value={peso}
              onChangeText={setPeso}
              placeholder="28,5"
              keyboardType="decimal-pad"
              className="bg-surface rounded-full px-4 py-3"
              style={{ fontFamily: "Poppins_400Regular" }}
            />
          </Campo>
        </View>
        <View className="flex-1">
          <Campo etiqueta="Sexo">
            <SelectorChips opciones={SEXOS} valor={sexo} onCambiar={setSexo} />
          </Campo>
        </View>
      </View>

      <Campo etiqueta="Color de Pelaje">
        <TextInput
          value={colorPelaje}
          onChangeText={setColorPelaje}
          placeholder="Ej. Dorado"
          className="bg-surface rounded-full px-4 py-3"
          style={{ fontFamily: "Poppins_400Regular" }}
        />
      </Campo>

      {error ? (
        <Text className="text-danger" style={{ fontFamily: "Poppins_400Regular" }}>
          {error}
        </Text>
      ) : null}

      <Boton titulo={textoBoton} onPress={manejarGuardar} />
    </View>
  );
}

// Etiqueta + campo, para no repetir el mismo bloque de Texto en cada input
function Campo({ etiqueta, children }: { etiqueta: string; children: React.ReactNode }) {
  return (
    <View>
      <Text className="text-secondary mb-1" style={{ fontFamily: "Poppins_500Medium" }}>
        {etiqueta}
      </Text>
      {children}
    </View>
  );
}

// Selector tipo "chips" (Perro | Gato | Otro), genérico para reusarlo
// tanto en Especie como en Sexo.
function SelectorChips<T extends string>({
  opciones,
  valor,
  onCambiar,
}: {
  opciones: T[];
  valor: T;
  onCambiar: (v: T) => void;
}) {
  return (
    <View className="flex-row bg-accent rounded-full p-1">
      {opciones.map((opcion) => {
        const activo = opcion === valor;
        return (
          <Pressable
            key={opcion}
            onPress={() => onCambiar(opcion)}
            className={`flex-1 py-2 rounded-full items-center ${activo ? "bg-surface" : ""}`}
          >
            <Text
              className={activo ? "text-secondary" : "text-textMuted"}
              style={{ fontFamily: "Poppins_500Medium" }}
            >
              {opcion}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
