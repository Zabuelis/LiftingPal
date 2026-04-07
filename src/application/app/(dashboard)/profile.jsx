import ThemedView from "../../components/ThemedView";
import { Text } from "react-native";

const Profile = () => {
  return (
    <ThemedView safe className="flex-1 items-center justify-center">
      <Text className="text-center">This is the profile page</Text>
    </ThemedView>
  );
};

export default Profile;
