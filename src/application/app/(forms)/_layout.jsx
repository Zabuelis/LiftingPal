import { Stack } from "expo-router";
import AuthenticatedOnly from "../../components/auth/AuthenticatedOnly";

const FormsLayout = () => {
  return (
    <AuthenticatedOnly>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthenticatedOnly>
  );
};
export default FormsLayout;
