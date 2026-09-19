import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { HistorialEntry } from "../types/models";
import { esFechaValida } from "../utils/fecha";
import Boton from "./Boton";

interface Props {
  entradaInicial?: HistorialEntry;
  onSubmit: (datos: Omit<HistorialEntry, "id" | "mascotaId">) => void;
  textoBoton?: string;
}

export default function HistorialForm({
  entradaInicial,
  onSubmit,
  textoBoton = "Guardar",
}: Props) {
  const [fecha, setFecha] = useState(entradaInicial?.fecha ?? "");
  const [diagnostico, setDiagnostico] = useState(entradaInicial?.diagnostico ?? "");
  const [tratamiento, setTratamiento] = useState(entradaInicial?.tratamiento ?? "");
  const [veterinario, setVeterinario] = useState(entradaInicial?.veterinario ?? "");
  const [clinica, setClinica] = useState(entradaInicial?.clinica ?? "");
  const [error, setError] = useState("");

  function manejarGuardar() {
    if (!fecha.trim() || !diagnostico.trim() || !tratamiento.trim() || !veterinario.trim()) {
      setError("Completa al menos fecha, diagnóstico, tratamiento y veterinario.");
      return;
    }

    if (!esFechaValida(fecha.trim())) {
      setError("La fecha debe tener el formato dd-mm-aaaa y ser válida.");
      return;
    }

    setError("");
    onSubmit({
      fecha: fecha.trim(),
      diagnostico: diagnostico.trim(),
      tratamiento: tratamiento.trim(),
      veterinario: veterinario.trim(),
      clinica: clinica.trim() || undefined,
    });
  }

  return (
    <View className="gap-4">
      <Campo etiqueta="Fecha (DD-MM-AAAA)">
        <TextInput
          value={fecha}
          onChangeText={setFecha}
          placeholder="15-03-2024"
          className="bg-surface rounded-full px-4 py-3"
          style={{ fontFamily: "Poppins_400Regular" }}
        />
      </Campo>

      <Campo etiqueta="Diagnóstico">
        <TextInput
          value={diagnostico}
          onChangeText={setDiagnostico}
          placeholder="Ej. Gastroenteritis leve"
          className="bg-surface rounded-2xl px-4 py-3"
          style={{ fontFamily: "Poppins_400Regular" }}
        />
      </Campo>

      <Campo etiqueta="Tratamiento">
        <TextInput
          value={tratamiento}
          onChangeText={setTratamiento}
          placeholder="Ej. Dieta blanda por 3 días + probióticos"
          multiline
          numberOfLines={3}
          className="bg-surface rounded-2xl px-4 py-3"
          style={{ fontFamily: "Poppins_400Regular", minHeight: 80, textAlignVertical: "top" }}
        />
      </Campo>

      <Campo etiqueta="Veterinario">
        <TextInput
          value={veterinario}
          onChangeText={setVeterinario}
          placeholder="Ej. Dra. Sofía Martínez"
          className="bg-surface rounded-full px-4 py-3"
          style={{ fontFamily: "Poppins_400Regular" }}
        />
      </Campo>

      <Campo etiqueta="Clínica (opcional)">
        <TextInput
          value={clinica}
          onChangeText={setClinica}
          placeholder="Ej. Clínica Vet del Sol"
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
