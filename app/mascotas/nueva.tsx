import { ScrollView, Text } from "react-native";
import { useRouter } from "expo-router";
import MascotaForm from "../../components/MascotaForm";
import { crearMascota } from "../../services/mascotasService";
import { Mascota } from "../../types/models";

export default function NuevaMascota() {
  const router = useRouter();

  async function manejarCrear(datos: Omit<Mascota, "id">) {
    await crearMascota(datos);
    router.back(); // vuelve a Inicio, donde el useFocusEffect recarga la lista
  }

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-2xl text-secondary mb-1" style={{ fontFamily: "Poppins_700Bold" }}>
        Agregar Mascota
      </Text>
      <Text className="text-textMuted mb-6" style={{ fontFamily: "Poppins_400Regular" }}>
        Completa los datos de tu compañero
      </Text>

      <MascotaForm onSubmit={manejarCrear} textoBoton="Guardar Mascota" />
    </ScrollView>
  );
}
