import { useCallback, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useFocusEffect, useLocalSearchParams, useRouter, Stack } from "expo-router";
import { getHistorialPorMascota } from "../../../../services/historialService";
import { getMascotaPorId } from "../../../../services/mascotasService";
import { HistorialEntry, Mascota } from "../../../../types/models";
import HistorialCard from "../../../../components/HistorialCard";
import Boton from "../../../../components/Boton";

export default function HistorialLista() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [entradas, setEntradas] = useState<HistorialEntry[]>([]);
  const [mascota, setMascota] = useState<Mascota | null>(null);

  useFocusEffect(
    useCallback(() => {
      Promise.all([getHistorialPorMascota(id), getMascotaPorId(id)]).then(
        ([lista, datosMascota]) => {
          setEntradas(lista);
          setMascota(datosMascota ?? null);
        }
      );
    }, [id])
  );

  return (
    <View className="flex-1 bg-background px-4 pt-4">
      <Stack.Screen
        options={{ title: mascota ? `Historial de ${mascota.nombre}` : "Historial Médico" }}
      />

      <FlatList
        data={entradas}
        keyExtractor={(item) => item.id}
        // Ya vienen ordenadas por fecha descendente desde el service
        renderItem={({ item }) => (
          <HistorialCard
            entrada={item}
            onPress={() => router.push(`/mascotas/${id}/historial/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <Text
            className="text-textMuted text-center mt-10"
            style={{ fontFamily: "Poppins_400Regular" }}
          >
            Todavía no hay entradas en el historial médico.
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <View className="absolute bottom-6 left-4 right-4">
        <Boton
          titulo="+ Agregar Entrada"
          onPress={() => router.push(`/mascotas/${id}/historial/nueva`)}
        />
      </View>
    </View>
  );
}
