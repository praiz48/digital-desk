import { Text, View } from "react-native";
import { useRegister } from "./hooks/useRegister";

export function RegisterScreen() {
  const { userData } = useRegister();

  return (
    <View className="flex-1 items-center justify-center bg-pink-500">
      <Text>{userData.name || "Register"}</Text>
    </View>
  );
}
