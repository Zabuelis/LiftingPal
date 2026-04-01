import { Stack } from "expo-router";
import AuthenticatedOnly from "../../../components/auth/AuthenticatedOnly";
import { WorkoutsProvider } from "../../../contexts/WorkoutsContext";

const FormsLayout = () => {
  return <Stack screenOptions={{ headerShown: false }} />;
};
export default FormsLayout;
