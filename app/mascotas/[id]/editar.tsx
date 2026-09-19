import { useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import MascotaForm from "../../../components/MascotaForm";
import { getMascotaPorId, actualizarMascota } from "../../../services/mascotasService";
import { Mascota } from "../../../types/models";

export default function EditarMascota() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const [cargando, setCargando] = useState(true);

  // Aquí usamos useEffect (no useFocusEffect como en la ficha o el inicio):
  // esta pantalla solo necesita cargar los datos UNA vez al entrar, no cada
  // vez que vuelve a foco. Si usáramos useFocusEffect, correríamos el riesgo
  // de resetear el formulario si el usuario vuelve a esta pantalla por algún
  // motivo mientras aún está escribiendo.
  useEffect(() => {
    getMascotaPorId(id).then((datos) => {
      setMascota(datos ?? null);
      setCargando(false);
    });
  }, [id]);

  async function manejarActualizar(datos: Omit<Mascota, "id">) {
    await actualizarMascota(id, datos);
    router.back(); // vuelve a la ficha, que se refresca sola por su useFocusEffect
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
      <Stack.Screen options={{ title: `Editar ${mascota.nombre}` }} />

      <Text className="text-2xl text-secondary mb-1" style={{ fontFamily: "Poppins_700Bold" }}>
        Editar Ficha
      </Text>
      <Text className="text-textMuted mb-6" style={{ fontFamily: "Poppins_400Regular" }}>
        Actualiza los datos de {mascota.nombre}
      </Text>

      <MascotaForm
        mascotaInicial={mascota}
        onSubmit={manejarActualizar}
        textoBoton="Guardar Cambios"
      />
    </ScrollView>
  );
}
