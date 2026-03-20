import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import { Colors } from "../../constants/Colors";
import PressableButton from "../../components/PressableButton";
import { useUser } from "../../hooks/useUser";
import { useState } from "react";
import StatusIndicator from "../../components/StatusIndicator";

const Home = () => {
  const { user, logout } = useUser();
  const [webMessageError, setWebMessageError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setWebMessageError(null);
    setIsLoading(true);
    try {
      await logout();
    } catch (error) {
      setWebMessageError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ThemedView className="flex-1 items-center justify-center">
      <ThemedText bold className="text-xl text-blue-500 p-8">
        Welcome to LiftingPal,
        {user ? ` ${user.name}` : " Unauthenticated"}
      </ThemedText>
      {webMessageError ? (
        <ThemedText
          bold
          style={{ color: Colors.errorText }}
          className="text-lg"
        >
          {webMessageError}
        </ThemedText>
      ) : null}
      <PressableButton onPress={handleLogout} className="w-full h-20">
        <ThemedText bold style={{ color: Colors.surface }} className="text-xl">
          LOG OUT
        </ThemedText>
      </PressableButton>
      <StatusIndicator isLoading={isLoading}></StatusIndicator>
    </ThemedView>
  );
};
export default Home;
