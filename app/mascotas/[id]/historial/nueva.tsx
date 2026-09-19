import { ScrollView, Text } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import HistorialForm from "../../../../components/HistorialForm";
import { crearEntrada } from "../../../../services/historialService";
import { HistorialEntry } from "../../../../types/models";

export default function NuevaEntradaHistorial() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  async function manejarCrear(datos: Omit<HistorialEntry, "id" | "mascotaId">) {
    // Aquí es donde se "pega" la entrada a la mascota correspondiente:
    // el formulario no sabe nada de mascotaId, esta pantalla se lo agrega
    // usando el "id" que viene en la URL.
    await crearEntrada({ ...datos, mascotaId: id });
    router.back();
  }

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 16 }}>
      <Stack.Screen options={{ title: "Nueva Entrada" }} />

      <Text className="text-2xl text-secondary mb-1" style={{ fontFamily: "Poppins_700Bold" }}>
        Nueva Entrada
      </Text>
      <Text className="text-textMuted mb-6" style={{ fontFamily: "Poppins_400Regular" }}>
        Registra una visita, diagnóstico o tratamiento
      </Text>

      <HistorialForm onSubmit={manejarCrear} textoBoton="Guardar Entrada" />
    </ScrollView>
  );
}
