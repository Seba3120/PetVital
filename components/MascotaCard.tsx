import { Pressable, Text, View } from "react-native";
import { Mascota } from "../types/models";

interface Props {
  mascota: Mascota;
  onPress: () => void;
}

export default function MascotaCard({ mascota, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-surface rounded-2xl p-4 mb-3 flex-row justify-between items-center"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}
    >
      <View>
        <Text className="text-secondary text-lg" style={{ fontFamily: "Poppins_700Bold" }}>
          {mascota.nombre}
        </Text>
        <Text className="text-textMuted" style={{ fontFamily: "Poppins_400Regular" }}>
          {mascota.especie} • {mascota.raza}
        </Text>
      </View>
      <Text className="text-primary" style={{ fontFamily: "Poppins_500Medium" }}>
        Ver ficha →
      </Text>
    </Pressable>
  );
}
