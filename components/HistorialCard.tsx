import { Pressable, Text, View } from "react-native";
import { HistorialEntry } from "../types/models";

interface Props {
  entrada: HistorialEntry;
  onPress: () => void;
}

export default function HistorialCard({ entrada, onPress }: Props) {
  return (
    <Pressable onPress={onPress} className="bg-surface rounded-2xl p-4 mb-3">
      <Text className="text-primary mb-1" style={{ fontFamily: "Poppins_500Medium" }}>
        {entrada.fecha}
      </Text>
      <Text className="text-secondary text-lg mb-1" style={{ fontFamily: "Poppins_700Bold" }}>
        {entrada.diagnostico}
      </Text>
      <Text className="text-textMuted mb-2" style={{ fontFamily: "Poppins_400Regular" }}>
        {entrada.clinica ? `${entrada.clinica} • ` : ""}
        {entrada.veterinario}
      </Text>
      <View className="bg-accent rounded-xl p-3">
        <Text className="text-secondary mb-1" style={{ fontFamily: "Poppins_500Medium" }}>
          Tratamiento:
        </Text>
        <Text className="text-secondary" style={{ fontFamily: "Poppins_400Regular" }}>
          {entrada.tratamiento}
        </Text>
      </View>
    </Pressable>
  );
}
