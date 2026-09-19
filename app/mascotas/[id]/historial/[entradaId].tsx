import { useEffect, useState } from "react";
import { View, ScrollView, Text, Alert } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import HistorialForm from "../../../../components/HistorialForm";
import Boton from "../../../../components/Boton";
import {
  getEntradaPorId,
  actualizarEntrada,
  eliminarEntrada,
} from "../../../../services/historialService";
import { HistorialEntry } from "../../../../types/models";

export default function EditarEntradaHistorial() {
  const { id, entradaId } = useLocalSearchParams<{ id: string; entradaId: string }>();
  const router = useRouter();
  const [entrada, setEntrada] = useState<HistorialEntry | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getEntradaPorId(entradaId).then((datos) => {
      setEntrada(datos ?? null);
      setCargando(false);
    });
  }, [entradaId]);

  async function manejarActualizar(datos: Omit<HistorialEntry, "id" | "mascotaId">) {
    await actualizarEntrada(entradaId, { ...datos, mascotaId: id });
    router.back();
  }

  function manejarEliminar() {
    Alert.alert(
      "Eliminar entrada",
      "¿Seguro que quieres eliminar esta entrada del historial? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await eliminarEntrada(entradaId);
            router.back();
          },
        },
      ]
    );
  }

  if (cargando) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-textMuted" style={{ fontFamily: "Poppins_400Regular" }}>
          Cargando...
        </Text>
      </View>
    );
  }

  if (!entrada) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-6">
        <Text
          className="text-secondary text-center"
          style={{ fontFamily: "Poppins_500Medium" }}
        >
          No se encontró esta entrada.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 16 }}>
      <Stack.Screen options={{ title: "Editar Entrada" }} />

      <Text className="text-2xl text-secondary mb-1" style={{ fontFamily: "Poppins_700Bold" }}>
        Editar Entrada
      </Text>
      <Text className="text-textMuted mb-6" style={{ fontFamily: "Poppins_400Regular" }}>
        Actualiza los datos de esta visita
      </Text>

      <HistorialForm
        entradaInicial={entrada}
        onSubmit={manejarActualizar}
        textoBoton="Guardar Cambios"
      />

      <View className="h-3" />

      <Boton titulo="Eliminar Entrada" variante="danger" onPress={manejarEliminar} />
      <View className="h-6" />
    </ScrollView>
  );
}
