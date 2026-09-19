import { useCallback, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { getMascotas } from "../../services/mascotasService";
import { Mascota } from "../../types/models";
import MascotaCard from "../../components/MascotaCard";
import Boton from "../../components/Boton";

export default function MascotasTab() {
  const router = useRouter();
  const [mascotas, setMascotas] = useState<Mascota[]>([]);

  // useFocusEffect: se ejecuta cada vez que esta pestaña vuelve a estar
  // en foco (ej. al volver de crear/editar una mascota), no solo al montar.
  useFocusEffect(
    useCallback(() => {
      getMascotas().then(setMascotas);
    }, [])
  );

  return (
    <View className="flex-1 bg-background px-4 pt-4">
      <FlatList
        data={mascotas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MascotaCard
            mascota={item}
            onPress={() => router.push(`/mascotas/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <Text
            className="text-textMuted text-center mt-10"
            style={{ fontFamily: "Poppins_400Regular" }}
          >
            Aún no tienes mascotas registradas.
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <View className="absolute bottom-6 left-4 right-4">
        <Boton titulo="+ Agregar Mascota" onPress={() => router.push("/mascotas/nueva")} />
      </View>
    </View>
  );
}
