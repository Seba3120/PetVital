import { useCallback, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { getMascotas } from "../../services/mascotasService";
import { Mascota } from "../../types/models";
import MascotaCard from "../../components/MascotaCard";
import Boton from "../../components/Boton";

export default function Inicio() {
  const router = useRouter();
  const [mascotas, setMascotas] = useState<Mascota[]>([]);

  useFocusEffect(
    useCallback(() => {
      getMascotas().then(setMascotas);
    }, [])
  );

  const primerasTres = mascotas.slice(0, 3);

  return (
    <ScrollView
      className="flex-1 bg-background px-4 pt-4"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text className="text-2xl text-secondary mb-1" style={{ fontFamily: "Poppins_700Bold" }}>
        ¡Hola! 👋
      </Text>
      <Text className="text-textMuted mb-6" style={{ fontFamily: "Poppins_400Regular" }}>
        Tienes {mascotas.length}{" "}
        {mascotas.length === 1 ? "mascota registrada" : "mascotas registradas"}.
      </Text>

      <Text className="text-secondary mb-3" style={{ fontFamily: "Poppins_700Bold" }}>
        Mis Mascotas
      </Text>

      {primerasTres.length === 0 ? (
        <Text className="text-textMuted mb-4" style={{ fontFamily: "Poppins_400Regular" }}>
          Aún no tienes mascotas. ¡Agrega la primera!
        </Text>
      ) : (
        primerasTres.map((mascota) => (
          <MascotaCard
            key={mascota.id}
            mascota={mascota}
            onPress={() => router.push(`/mascotas/${mascota.id}`)}
          />
        ))
      )}

      <View className="h-2" />

      <Boton titulo="+ Agregar Mascota" onPress={() => router.push("/mascotas/nueva")} />

      {mascotas.length > 3 && (
        <>
          <View className="h-3" />
          <Boton
            titulo="Ver todas mis mascotas"
            variante="outline"
            onPress={() => router.push("/mascotas")}
          />
        </>
      )}
    </ScrollView>
  );
}
