import { useCallback, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useFocusEffect, useLocalSearchParams, useRouter, Stack } from "expo-router";
import { getMascotaPorId, eliminarMascota } from "../../../services/mascotasService";
import { getHistorialPorMascota } from "../../../services/historialService";
import { Mascota } from "../../../types/models";
import { formatearNumero } from "../../../utils/numero";
import Boton from "../../../components/Boton";

export default function FichaMascota() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const [cantidadHistorial, setCantidadHistorial] = useState(0);
  const [cargando, setCargando] = useState(true);

  // Se recarga cada vez que volvemos a esta pantalla (ej. tras editar
  // o tras agregar una entrada al historial), no solo al montar.
  useFocusEffect(
    useCallback(() => {
      let sigueMontado = true;
      setCargando(true);

      Promise.all([getMascotaPorId(id), getHistorialPorMascota(id)]).then(
        ([datosMascota, entradas]) => {
          if (!sigueMontado) return;
          setMascota(datosMascota ?? null);
          setCantidadHistorial(entradas.length);
          setCargando(false);
        }
      );

      return () => {
        sigueMontado = false;
      };
    }, [id])
  );

  function manejarEliminar() {
    Alert.alert(
      "Eliminar mascota",
      `¿Seguro que quieres eliminar a ${mascota?.nombre}? Esta acción no se puede deshacer.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await eliminarMascota(id);
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

  if (!mascota) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-6">
        <Text
          className="text-secondary text-center"
          style={{ fontFamily: "Poppins_500Medium" }}
        >
          No se encontró esta mascota.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 16 }}>
      {/* Título del header dinámico: el nombre de la mascota, no un texto fijo */}
      <Stack.Screen options={{ title: mascota.nombre }} />

      <Text className="text-2xl text-secondary" style={{ fontFamily: "Poppins_700Bold" }}>
        {mascota.nombre}
      </Text>
      <Text className="text-textMuted mb-6" style={{ fontFamily: "Poppins_400Regular" }}>
        {mascota.especie} • {mascota.raza}
      </Text>

      <View className="bg-surface rounded-2xl p-4 mb-4">
        <Text className="text-secondary mb-3" style={{ fontFamily: "Poppins_700Bold" }}>
          Datos Generales
        </Text>
        <InfoRow etiqueta="Sexo" valor={mascota.sexo} />
        <InfoRow etiqueta="Fecha de Nacimiento" valor={mascota.fechaNacimiento} />
        <InfoRow etiqueta="Peso" valor={`${formatearNumero(mascota.peso)} kg`} />
        <InfoRow etiqueta="Color de Pelaje" valor={mascota.colorPelaje} ultimo />
      </View>

      <Boton
        titulo={`Historial Médico (${cantidadHistorial})`}
        variante="secondary"
        onPress={() => router.push(`/mascotas/${id}/historial`)}
      />

      <View className="h-3" />

      <Boton
        titulo="Editar Ficha"
        variante="outline"
        onPress={() => router.push(`/mascotas/${id}/editar`)}
      />

      <View className="h-3" />

      <Boton titulo="Eliminar Mascota" variante="danger" onPress={manejarEliminar} />

      <View className="h-6" />
    </ScrollView>
  );
}

function InfoRow({
  etiqueta,
  valor,
  ultimo = false,
}: {
  etiqueta: string;
  valor: string;
  ultimo?: boolean;
}) {
  return (
    <View className={`flex-row justify-between py-2 ${ultimo ? "" : "border-b border-accent"}`}>
      <Text className="text-textMuted" style={{ fontFamily: "Poppins_400Regular" }}>
        {etiqueta}
      </Text>
      <Text className="text-secondary" style={{ fontFamily: "Poppins_500Medium" }}>
        {valor}
      </Text>
    </View>
  );
}
