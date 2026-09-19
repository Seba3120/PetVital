import { Pressable, Text } from "react-native";

interface BotonProps {
  titulo: string;
  onPress: () => void;
  variante?: "primary" | "secondary" | "outline" | "danger";
}

const estilosPorVariante: Record<string, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  outline: "bg-transparent border border-secondary",
  danger: "bg-danger",
};

export default function Boton({ titulo, onPress, variante = "primary" }: BotonProps) {
  const textoColor = variante === "outline" ? "text-secondary" : "text-white";

  return (
    <Pressable
      onPress={onPress}
      className={`${estilosPorVariante[variante]} rounded-full py-3 items-center`}
    >
      <Text className={`${textoColor} text-base`} style={{ fontFamily: "Poppins_500Medium" }}>
        {titulo}
      </Text>
    </Pressable>
  );
}
